import re
import json
import graphviz
import utils as utils
from utils import PNLTypes, PNLConstants, extract_defaults
from redbaron import RedBaron
from model.modelGraph import ModelGraph
from model.codeGenerator import CodeGenerator
import psyneulink as pnl

pnls_utils = utils.PNLUtils()


class ModelParser:
    def __init__(self, psyneulink_instance):
        self.psyneulink_instance = psyneulink_instance
        self.psyneulink_composition_manipulation_methods = [
            "add_node",
            "add_nodes",
            "add_projection",
            "add_projections",
            "add_pathway",
            "add_linear_processing_pathway",
            "add_linear_learning_pathway",
            "add_reinforcement_learning_pathway",
            "add_td_learning_pathway",
            "add_backpropagation_learning_pathway",
            "add_controller",
            "add_required_node_role",
            "set_log_conditions",
        ]
        self.psyneulink_composition_classes = self.get_class_hierarchy(
            self.psyneulink_instance.Composition
        )
        self.psyneulink_mechanism_classes = self.get_class_hierarchy(
            self.psyneulink_instance.Mechanism
        )
        self.psyneulink_projection_classes = self.get_class_hierarchy(
            self.psyneulink_instance.Projection
        )
        self.psyneulink_function_classes = self.get_class_hierarchy(
            self.psyneulink_instance.Function
        )
        self.psyneulink_calls = (
            self.psyneulink_composition_classes
            + self.psyneulink_mechanism_classes
            + self.psyneulink_projection_classes
            + self.psyneulink_function_classes
            + self.psyneulink_composition_manipulation_methods
        )
        self.reset_env()
        self.all_loggable_items, self.all_default_values = self.get_initials()


    def get_initials(self):
        all_loggable_items = {}
        all_default_values = {}
        temp_instance = getattr(pnl, 'Composition')()
        all_loggable_items['Composition'] = temp_instance.loggable_items
        all_default_values['Composition'] = temp_instance.json_summary
        for key in self.psyneulink_mechanism_classes:
            try:
                temp_instance = getattr(pnl, key)()
                all_loggable_items[key] = temp_instance.loggable_items
                all_default_values[key] = temp_instance.json_summary
            except Exception as e:
                all_loggable_items[key] = {}
                all_default_values[key] = {}
        pnl.clear_registry()
        return all_loggable_items, all_default_values


    def get_loggables(self):
        return self.all_loggable_items


    def get_defaults(self):
        return self.all_default_values


    def reset_env(self):
        self.index = {}
        self.localvars = locals()
        self.globalvars = globals()
        self.fst = None
        self.all_assigns = None
        self.all_assigns_dict = {}
        self.comments = []
        self.all_imports = None
        self.src_executed = ""
        self.compositions = []
        self.model_nodes = {
            PNLTypes.MECHANISMS.value: {},
            PNLTypes.PROJECTIONS.value: {},
            PNLTypes.COMPOSITIONS.value: {},
        }
        self.model_tree = ModelGraph()
        self.graphviz_graph = {
            PNLTypes.MECHANISMS.value: [],
            PNLTypes.COMPOSITIONS.value: [],
            PNLConstants.SUMMARY.value: {},
            PNLConstants.LOGGABLES.value: {}
        }


    def get_graphviz(self):
        return self.graphviz_graph


    def extract_data_from_model(self):
        self.all_assigns = self.fst.find_all("assign", recursive=False)
        self.comments = self.fst.find_all("comment", recursive=False)
        self.all_imports = self.fst.find_all("import", recursive=False)
        self.all_assigns_dict = {}
        for i in self.all_assigns:
            if i.name.value not in self.all_assigns_dict:
                self.all_assigns_dict[i.name.value] = []
            self.all_assigns_dict[i.name.value].append(i)
        self.psyneulink_instance.clear_registry()
        self.execute_ast()
        self.get_model_nodes()
        self.compute_model_tree()


    def parse_model(self, src):
        self.reset_env()
        self.fst = RedBaron(src)
        self.extract_data_from_model()
        return self.get_graphviz_graph()


    def get_model_nodes(self):
        try:
            for node in self.all_assigns:
                if hasattr(self.localvars[str(node.target)], "componentType"):
                    node_type = self.localvars[str(node.target)].componentType
                    if hasattr(self.localvars[str(node.target)], "json_summary"):
                        self.graphviz_graph[PNLConstants.SUMMARY.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)].json_summary
                    else:
                        self.graphviz_graph[PNLConstants.SUMMARY.value][str(self.localvars[str(node.target)].name)] = {}
                    if hasattr(self.localvars[str(node.target)], "loggable_items"):
                        self.graphviz_graph[PNLConstants.LOGGABLES.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)].loggable_items
                    else:
                        self.graphviz_graph[PNLConstants.LOGGABLES.value][str(self.localvars[str(node.target)].name)] = {}
                    if node_type in self.psyneulink_composition_classes:
                        self.model_nodes[PNLTypes.COMPOSITIONS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
                    elif node_type in  self.psyneulink_mechanism_classes:
                        self.model_nodes[PNLTypes.MECHANISMS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
                    elif node_type in  self.psyneulink_projection_classes:
                        self.model_nodes[PNLTypes.PROJECTIONS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
        except Exception as e:
            pnls_utils.logError(str(e))
            raise Exception("Error in get_model_nodes")


    def compute_model_tree(self):
        _model_map = {
            PNLTypes.MECHANISMS.value: list(self.model_nodes[PNLTypes.MECHANISMS.value]),
            PNLTypes.PROJECTIONS.value: list(self.model_nodes[PNLTypes.PROJECTIONS.value]),
            PNLTypes.COMPOSITIONS.value: list(self.model_nodes[PNLTypes.COMPOSITIONS.value]),
        }
        # Consume all the compositions first in order to build the tree
        for key in list(self.model_nodes[PNLTypes.COMPOSITIONS.value]):
            if key in _model_map[PNLTypes.COMPOSITIONS.value]:
                composition = self.model_nodes[PNLTypes.COMPOSITIONS.value][key]
                children = composition.nodes
                self.model_tree.add_node(composition, None)
                for child in children:
                    if child.componentType in self.psyneulink_mechanism_classes:
                        if self.model_tree.add_node(child, composition):
                            if child.name in _model_map[PNLTypes.MECHANISMS.value]:
                                _model_map[PNLTypes.MECHANISMS.value].remove(child.name)
                        else:
                            raise Exception("Error adding Mechanism to model tree")
                    elif child.componentType in self.psyneulink_composition_classes:
                        if self.model_tree.add_node(child, composition) is False:
                            self.model_tree.move_node(child, composition)
                _model_map[PNLTypes.COMPOSITIONS.value].remove(key)
        # Consume all the mechanisms
        for key in list(_model_map[PNLTypes.MECHANISMS.value]):
            if key in _model_map[PNLTypes.MECHANISMS.value]:
                mechanism = self.model_nodes[PNLTypes.MECHANISMS.value][key]
                self.model_tree.add_node(mechanism, None)
                _model_map[PNLTypes.MECHANISMS.value].remove(key)
        return self.model_tree


    def generate_graphviz(self):
        self.graphviz_graph[PNLTypes.MECHANISMS.value] = []
        self.graphviz_graph[PNLTypes.COMPOSITIONS.value] = []
        orphan_nodes = None
        for key in list(self.model_tree.get_graph()):
            node = self.model_tree.get_graph()[key].get_node()
            if node.componentType in self.psyneulink_composition_classes:
                gv_node = None
                node.show_graph(show_node_structure='all')
                gv_node = node.show_graph(show_node_structure='all', output_fmt="gv")
                self.graphviz_graph[PNLTypes.COMPOSITIONS.value].append(gv_node.pipe('json', quiet=True).decode())
            elif node.componentType in self.psyneulink_mechanism_classes:
                if orphan_nodes is None:
                    orphan_nodes = graphviz.Digraph('mechanisms')
                gv_node = node._show_structure(output_fmt="struct")
                orphan_nodes.node(node.name, gv_node)
        if orphan_nodes is not None:
            orphans_json = json.loads(orphan_nodes.pipe('json').decode())
            [self.graphviz_graph[PNLTypes.MECHANISMS.value].append(json.dumps(i)) for i in orphans_json['objects']]


    def get_graphviz_graph(self):
        self.generate_graphviz()
        self.adjust_roots_positions()
        return self.graphviz_graph


    def adjust_roots_positions(self):
        spacing = 100
        # space the compositions first
        for (idx, comp_string) in enumerate(self.graphviz_graph[PNLTypes.COMPOSITIONS.value]):
            composition = json.loads(comp_string)
            composition['bb'] = ','.join([str(float(i) + spacing) if ix % 2 == 0 else str(float(i)) for (ix,i) in enumerate(composition['bb'].split(','))])
            for (cidx, child) in enumerate(composition['objects']):
                # if it's a nested composition has a bounding box
                if 'bb' in child:
                    composition['objects'][cidx]['bb'] = ','.join([str(float(i) + spacing) if ix % 2 == 0 else str(float(i)) for (ix,i) in enumerate(child['bb'].split(','))])
                # if it's a mechanism it has a position
                elif 'pos' in child:
                    composition['objects'][cidx]['pos'] = ','.join([str(float(i) + spacing) if ix % 2 == 0 else str(float(i)) for (ix,i) in enumerate(child['pos'].split(','))])
            spacing += 700
            self.graphviz_graph[PNLTypes.COMPOSITIONS.value][idx] = json.dumps(composition)

        # space the mechanisms
        for (idx, mech_string) in enumerate(self.graphviz_graph[PNLTypes.MECHANISMS.value]):
            mechanism = json.loads(mech_string)
            if 'pos' in mechanism:
                mechanism['pos'] = ','.join([str(float(i) + spacing) if ix % 2 == 0 else str(float(i)) for (ix,i) in enumerate(mechanism['pos'].split(','))])
                spacing += 700
                self.graphviz_graph[PNLTypes.MECHANISMS.value][idx] = json.dumps(mechanism)


    def get_class_hierarchy(self, root_class, class_hierarchy=None):
        if class_hierarchy is None:
            class_hierarchy = [root_class.__name__]
        subclasses = root_class.__subclasses__()
        if subclasses:
            class_hierarchy.extend([i.__name__ for i in subclasses])
            for subclass in subclasses:
                self.get_class_hierarchy(subclass, class_hierarchy=class_hierarchy)
        return class_hierarchy


    def execute_node(self, node):
        try:
            if not node in self.index:
                self.index[node] = {"executed": False}
            if not self.index[node]["executed"]:
                pnls_utils.logInfo('\n\n\n### Executing Node ' + node.dumps() + ' ###')
                exec(node.dumps(), self.globalvars, self.localvars)
                self.index[node]["executed"] = True
                self.src_executed += node.dumps() + "\n"
        except NameError as err:
            var_name = re.search(r"(?<=').*(?=')", err.args[0]).group()
            if var_name in self.all_assigns_dict:
                for dependency in self.all_assigns_dict[var_name]:
                    if (
                        dependency.absolute_bounding_box.top_left.line
                        < node.absolute_bounding_box.top_left.line
                    ):
                        self.execute_node(dependency)
                    else:
                        assert True
            else:
                assignment_deep_search = self.all_assigns.find("name", var_name)
                if assignment_deep_search:
                    self.execute_node(assignment_deep_search.parent)
            self.execute_node(node)


    def skip_node(self, node):
        pnls_utils.logInfo('\n\n\n### Skipping Node ' + node.dumps() + ' ###')


    def check_list_node_for_types(self, list_node, acceptable_types):
        types = set(acceptable_types)
        for i in list_node.value:
            if not i.type in types:
                return False
        return True


    def execute_ast(self):
        for i in self.fst:
            if i.find(["import", "from_import", "dotted_as_name", "name_as_name"]):
                self.execute_node(i)
            elif i.find("def"):
                if i.find("name", self.psyneulink_calls):
                    self.psyneulink_calls.append(i.name)
                self.execute_node(i)
            elif i.find("assign") or i.find("call"):
                acceptable_types = [
                    "int",
                    "float",
                    "binary",
                    "string",
                    "raw_string",
                    "binary_string",
                    "string_chain",
                ]
                if (
                    hasattr(i.value, "type")
                    and i.value.type in acceptable_types
                    or hasattr(i.value, "type")
                    and i.value.type == "list"
                    and self.check_list_node_for_types(i, acceptable_types)
                    or i.find("name", self.psyneulink_calls)
                ):
                    self.execute_node(i)
            elif i.find("call"):
                if i.find("name", self.psyneulink_calls):
                    self.execute_node(i)
        gdict = self.fst.find("assign", lambda x: x.find("name", "pnlv_graphics_spec"))
        if gdict:
            self.execute_node(gdict)
        else:
            self.globalvars["pnlv_graphics_spec"] = {}


    def getType(self, params):
        # TODO: improve api to filter in advance by type rather than checking the entire dictionary
        response = {'type': 'unknown'}
        for key in self.model_nodes:
            if params in self.model_nodes[key]:
                response = {
                    'type': str(self.model_nodes[key][params].componentType),
                }
                return response
        return response


    def update_model(self, file, modelJson):
        oldFST = self.fst
        try:
            newFst = RedBaron("import psyneulink as pnl")
            codeGenerator = CodeGenerator(modelJson, newFst, self.fst, self.comments, self.all_assigns)
            self.reset_env()
            self.fst = codeGenerator.get_fst()
            self.extract_data_from_model()
            file.write(self.fst.dumps())
        except Exception as e:
            file.write(oldFST.dumps())
            file.close()
            raise Exception("Error updating model\n" + e)
