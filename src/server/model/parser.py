import re
import copy
import json
import graphviz
from enum import Enum
from redbaron import RedBaron
from model.modelGraph import ModelGraph
import utils as utils

pnls_utils = utils.PNLUtils()


class PNLTypes(Enum):
    COMPOSITIONS = 'Composition'
    MECHANISMS = 'Mechanism'
    PROJECTIONS = 'Projection'
    SUMMARY = 'Summary'


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
        self.index = {}
        self.localvars = locals()
        self.globalvars = globals()
        self.fst = None
        self.all_assigns = None
        self.all_assigns_dict = {}
        self.comments = []
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
            PNLTypes.SUMMARY.value: {}
        }

    def reset_env(self):
        self.index = {}
        self.localvars = locals()
        self.globalvars = globals()
        self.fst = None
        self.all_assigns = None
        self.all_assigns_dict = {}
        self.comments = []
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
            PNLTypes.SUMMARY.value: {}
        }

    def get_graphviz(self):
        return self.graphviz_graph

    def parse_model(self, src):
        self.reset_env()
        self.fst = RedBaron(src)
        self.all_assigns = self.fst.find_all("assign", recursive=False)
        self.comments = self.fst.find_all("comment", recursive=False)
        self.all_assigns_dict = {}
        for i in self.all_assigns:
            if i.name.value not in self.all_assigns_dict:
                self.all_assigns_dict[i.name.value] = []
            self.all_assigns_dict[i.name.value].append(i)
        self.execute_ast()
        self.get_model_nodes()
        self.compute_model_tree()
        return self.get_graphviz_graph()

    def get_model_nodes(self):
        try:
            for node in self.all_assigns:
                node_type = self.localvars[str(node.target)].componentType
                self.graphviz_graph[PNLTypes.SUMMARY.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)].json_summary
                if node_type in self.psyneulink_composition_classes:
                    self.model_nodes[PNLTypes.COMPOSITIONS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
                elif node_type in  self.psyneulink_mechanism_classes:
                    self.model_nodes[PNLTypes.MECHANISMS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
                elif node_type in  self.psyneulink_projection_classes:
                    self.model_nodes[PNLTypes.PROJECTIONS.value][str(self.localvars[str(node.target)].name)] = self.localvars[str(node.target)]
        except Exception as e:
            pnls_utils.logError(str(e))

    def compute_model_tree(self):
        _model_nodes = copy.deepcopy(self.model_nodes)
        # Consume all the compositions first in order to build the tree
        for key in list(_model_nodes[PNLTypes.COMPOSITIONS.value]):
            if key in _model_nodes[PNLTypes.COMPOSITIONS.value]:
                composition = self.model_nodes[PNLTypes.COMPOSITIONS.value][key]
                children = composition.nodes
                self.model_tree.add_node(composition, None)
                for child in children:
                    if child.componentType in self.psyneulink_mechanism_classes:
                        if self.model_tree.add_node(child, composition):
                            if child.name in _model_nodes[PNLTypes.MECHANISMS.value]:
                                del _model_nodes[PNLTypes.MECHANISMS.value][child.name]
                        else:
                            raise Exception("Error adding Mechanism to model tree")
                    elif child.componentType in self.psyneulink_composition_classes:
                        if self.model_tree.add_node(child, composition) is False:
                            self.model_tree.move_node(child, composition)
                del _model_nodes[PNLTypes.COMPOSITIONS.value][key]
        # Consume all the mechanisms
        for key in list(_model_nodes[PNLTypes.MECHANISMS.value]):
            if key in _model_nodes[PNLTypes.MECHANISMS.value]:
                mechanism = self.model_nodes[PNLTypes.MECHANISMS.value][key]
                self.model_tree.add_node(mechanism, None)
                del _model_nodes[PNLTypes.MECHANISMS.value][key]
        return self.model_tree

    def generate_graphviz(self):
        self.graphviz_graph[PNLTypes.MECHANISMS.value] = []
        self.graphviz_graph[PNLTypes.COMPOSITIONS.value] = []
        orphan_nodes = None
        for key in list(self.model_tree.get_graph()):
            node = self.model_tree.get_graph()[key].get_node()
            if node.componentType in self.psyneulink_composition_classes:
                gv_node = node.show_graph(show_node_structure='ALL', output_fmt="gv")
                self.graphviz_graph[PNLTypes.COMPOSITIONS.value].append(gv_node.pipe('json').decode())
            elif node.componentType in self.psyneulink_mechanism_classes:
                if orphan_nodes is None:
                    orphan_nodes = graphviz.Digraph('mechanisms')
                gv_node = node._show_graph(output_fmt="struct")
                orphan_nodes.node(node.name, gv_node)

    def get_graphviz_graph(self):
        self.generate_graphviz()
        return self.graphviz_graph

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
        pass


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

    def apiCall(self, data):
        callData = json.loads(data)
        method = callData["method"]
        params = callData["params"]
        if method == "getType":
            return self.getType(params)
        elif method == "getSummary":
            pass
        elif method == "getProperties":
            pass
        elif method == "getValues":
            pass
        elif method == "getPorts":
            pass
        elif method == "setValues":
            pass
        return ""

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
