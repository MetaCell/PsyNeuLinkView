from utils import PNLTypes, PNLPortTypes

class CodeGenerator:
    def __init__(self, serialisedModel, fst, oldFST = None, comments = None, assigns = None):
        self.fst = fst
        self.prevFST = oldFST
        self.comments = comments
        self.all_assigns = assigns
        self.serialisedCompositions = serialisedModel[PNLTypes.COMPOSITIONS.value]
        del serialisedModel[PNLTypes.COMPOSITIONS.value]
        self.serialisedProjections = serialisedModel[PNLTypes.PROJECTIONS.value]
        del serialisedModel[PNLTypes.PROJECTIONS.value]
        self.serialisedMechanisms = serialisedModel
        self.mechanisms = []
        self.projections = []
        self.compositions = []
        self.instructions = []
        self.generate_model_source()

    def get_fst(self):
        return self.fst

    def generate_model_source(self):
        self.consume_compositions()
        self.consume_mechanisms()
        self.consume_projections()
        self.fill_instructions()
        self.build_model()
        self.populate_fst()

    def populate_fst(self):
        index = len(self.fst.node_list)
        self.fst.insert(index, "from psyneulink import *")
        for instruction in self.instructions:
            index += 1
            self.fst.insert(index, instruction)

    def fill_instructions(self):
        for mechanism in self.mechanisms:
            self.instructions.append(mechanism.get_python_src())
            self.instructions.extend(mechanism.get_post_src_instructions())
        for projection in self.projections:
            self.instructions.append(projection.get_python_src())
            self.instructions.extend(projection.get_post_src_instructions())
        for composition in self.compositions:
            self.instructions.append(composition.get_python_src())
            self.instructions.extend(composition.get_post_src_instructions())

    def build_model(self):
        for mechanism in self.mechanisms:
            if mechanism.get_parent() is not None:
                self.instructions.append(mechanism.get_parent() + ".add_node(" + mechanism.get_name() + ")")
        for projection in self.projections:
            if projection.get_parent() is not None:
                self.instructions.append(projection.get_parent() + ".add_projection(" + projection.get_name() + ")")
        for composition in self.compositions:
            if composition.get_parent() is not None:
                self.instructions.append(composition.get_parent() + ".add_node(" + composition.get_name() + ")")

    def consume_compositions(self):
        for node in self.serialisedCompositions:
            self.compositions.append(PythonComposition(node, PNLTypes.COMPOSITIONS.value))

    def consume_projections(self):
        for node in self.serialisedProjections:
            self.projections.append(PythonProjection(node, PNLTypes.PROJECTIONS.value))

    def consume_mechanisms(self):
        allMechanismClasses = list(self.serialisedMechanisms.keys())
        for mechanismClass in allMechanismClasses:
            for node in self.serialisedMechanisms[mechanismClass]:
                self.mechanisms.append(PythonMechanism(node, mechanismClass))

class PythonNode:
    def __init__(self, node, pnlClass, params_to_skip = ['pnlClass', 'Loggables']):
        self.node = node
        self.pnlClass = pnlClass
        self.nodeName = self.node['name'] if 'name' in node else self.node['id']
        self.params_to_skip = params_to_skip
        self.options = list(self.node['class_inputs'].keys())
        self.post_src_instructions = []
        self.parent = self.compute_parent()
        self.pythonSrc = self.generate_python_src()
        self.fill_post_src_instructions()

    def generate_python_src(self):
        src = self.node['name'] + " = " + "pnl." + self.pnlClass + "(" + self.generate_params() + ")"
        return src

    def fill_post_src_instructions(self):
        if 'Loggables' in self.node['class_inputs']:
            for loggable in self.node['class_inputs']['Loggables']:
                if self.node['class_inputs']['Loggables'][loggable] != 'OFF':
                    self.post_src_instructions.append(self.node['name'] + ".log.set_log_conditions('" + loggable + "')")

    def get_post_src_instructions(self):
        return self.post_src_instructions

    def generate_params(self):
        params_src = ""
        params = [a for a in self.options if a not in self.params_to_skip]
        for param in params:
            params_src += param + " = " + self.node['class_inputs'][param] + ", "
        if 'name' not in params:
            params_src += "name = '" + self.node['name'] + "', "
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


class PythonMechanism(PythonNode):
    def __init__(self, node, pnlClass):
        super(PythonMechanism, self).__init__(node, pnlClass, ['pnlClass', 'Loggables', 'ports', 'graphPath'])
        self.input_ports = []
        self.output_ports = []

    def fill_post_src_instructions(self):
        super().fill_post_src_instructions()

    def generate_params(self):
        params_src = super().generate_params()
        self.input_ports = [port for port in self.node['class_inputs']['ports'] if port['type'] == PNLPortTypes.INPUT.value]
        self.output_ports = [port for port in self.node['class_inputs']['ports'] if port['type'] == PNLPortTypes.OUTPUT.value]
        if len(self.output_ports) > 0:
            params_src += "output_ports = [" + self.generate_output_ports() + "], "
        if len(self.input_ports) > 0:
            params_src += "input_ports = [" + self.generate_input_ports() + "], "
        return params_src

    def generate_input_ports(self):
        input_ports_src = ""
        for port in self.input_ports:
            input_ports_src += port.name + ", "
        return input_ports_src

    def generate_output_ports(self):
        output_ports_src = ""
        for port in self.output_ports:
            output_ports_src += port.name + ", "
        return output_ports_src


class PythonProjection(PythonNode):
    def __init__(self, node, pnlClass):
        super(PythonProjection, self).__init__(node, pnlClass)

    def generate_python_src(self):
        src = self.node['name'] + " = " + "pnl.MappingProjection(" + self.generate_params() + ")"
        return src

    def generate_params(self):
        # add sender and receiver
        return ''

    def compute_parent(self):
        return None


class PythonComposition(PythonNode):
    def __init__(self, node, pnlClass):
        super(PythonComposition, self).__init__(node, pnlClass, ['pnlClass', 'Loggables', 'ports', 'graphPath'])
