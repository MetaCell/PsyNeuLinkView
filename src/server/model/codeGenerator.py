from utils import PNLTypes

class CodeGenerator:
    def __init__(self, serialisedModel, comments, fst):
        self.fst = fst
        self.comments = comments
        self.serialisedCompositions = serialisedModel['Composition']
        del serialisedModel['Composition']
        self.serialisedProjections = serialisedModel['Projection']
        del serialisedModel['Projection']
        self.serialisedMechanisms = serialisedModel
        self.mechanisms = []
        self.projections = []
        self.compositions = []
        self.instructions = []
        self.generate_model_source()

    def generate_model_source(self):
        self.consume_compositions()
        self.consume_mechanisms()
        self.consume_projections()
        self.fill_instructions()
        self.build_model()
        self.populate_fst()

    def populate_fst(self):
        index = len(self.fst.node_list)
        for instruction in self.instructions:
            self.fst.insert(index, instruction)
            index += 1

    def fill_instructions(self):
        for mechanism in self.mechanisms:
            self.instructions.append(mechanism.get_python_src())
        for projection in self.projections:
            self.instructions.append(projection.get_python_src())
        for composition in self.compositions:
            self.instructions.append(composition.get_python_src())

    def build_model(self):
        for mechanism in self.mechanisms:
            if mechanism.get_parent() is not None:
                self.instructions.append(mechanism.get_parent() + ".add_node(" + mechanism.get_name() + ")")
        for projection in self.projections:
            #TODO: missing these data in the serialization atm
            pass
        for composition in self.compositions:
            if composition.get_parent() is not None:
                self.instructions.append(composition.get_parent() + ".add_node(" + composition.get_name() + ")")

    def consume_compositions(self):
        for node in self.serialisedCompositions:
            self.compositions.append(PythonNode(node, PNLTypes.COMPOSITIONS.value))

    def consume_projections(self):
        for node in self.serialisedProjections:
            self.projections.append(PythonNode(node, PNLTypes.PROJECTIONS.value))

    def consume_mechanisms(self):
        allMechanismClasses = list(self.serialisedMechanisms.keys())
        for mechanismClass in allMechanismClasses:
            for node in self.serialisedMechanisms[mechanismClass]:
                self.mechanisms.append(PythonNode(node, mechanismClass))

class PythonNode:
    def __init__(self, node, pnlClass):
        self.node = node
        self.pnlClass = pnlClass
        self.nodeName = self.node['name']
        self.pythonSrc = self.generate_python_src()
        self.parent = self.compute_parent()

    def generate_python_src(self):
        src = self.node['name'] + " = " + "pnl." + self.pnlClass + "(" + self.generate_params() + ")"
        return src

    def generate_params(self):
        params_src = ""
        params = list(self.node['class_inputs'].keys())
        for param in params:
            params_src += param + " = " + self.node['class_inputs'][param] + ", "
        if 'name' not in params:
            params_src += "name = '" + self.node['name'] + "'"
        return params_src

    def compute_parent(self):
        try:
            return self.node['graphPath'][-2]
        except:
            return None

    def get_python_src(self):
        return self.pythonSrc

    def get_parent(self):
        return self.parent

    def get_name(self):
        return self.nodeName
