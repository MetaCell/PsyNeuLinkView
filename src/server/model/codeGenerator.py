from utils import PNLTypes, PNLPortTypes


class CodeGenerator:
    def __init__(self, serialisedModel, fst, oldFST=None, comments=None, assigns=None):
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
        src_index = len(self.fst.node_list)
        self.fst.insert(src_index, "from psyneulink import *")
        for instruction in self.instructions:
            src_index += 1
            self.fst.insert(src_index, instruction)
        for comment in self.comments:
            src_index += 1
            self.fst.insert(src_index, comment.dumps())

    def fill_instructions(self):
        self.add_new_lines()
        for mechanism in self.mechanisms:
            if len(mechanism.get_pre_src_instructions()) > 0:
                self.instructions.extend(mechanism.get_pre_src_instructions())
            self.instructions.append(mechanism.get_python_src())
            if len(mechanism.get_post_src_instructions()) > 0:
                self.instructions.extend(mechanism.get_post_src_instructions())
        for projection in self.projections:
            if len(projection.get_pre_src_instructions()) > 0:
                self.instructions.extend(projection.get_pre_src_instructions())
            self.instructions.append(projection.get_python_src())
            if len(projection.get_post_src_instructions()) > 0:
                self.instructions.extend(projection.get_post_src_instructions())
        for composition in self.compositions:
            if len(composition.get_pre_src_instructions()) > 0:
                self.instructions.extend(composition.get_pre_src_instructions())
            self.instructions.append(composition.get_python_src())

    def add_new_lines(self):
        self.instructions.extend(["\n"])

    def build_model(self):
        self.add_new_lines()
        for mechanism in self.mechanisms:
            if mechanism.get_parent() is not None:
                self.instructions.append(
                    mechanism.get_parent() + ".add_node(" + mechanism.get_name() + ")"
                )
        self.add_new_lines()
        for projection in self.projections:
            if projection.get_parent() is not None:
                self.instructions.append(
                    projection.get_parent()
                    + ".add_projection("
                    + projection.get_name()
                    + ")"
                )
        self.add_new_lines()
        for composition in self.compositions:
            if composition.get_parent() is not None:
                self.instructions.append(
                    composition.get_parent()
                    + ".add_node("
                    + composition.get_name()
                    + ")"
                )
        self.add_new_lines()
        for composition in self.compositions:
            if len(composition.get_post_src_instructions()) > 0:
                self.instructions.extend(composition.get_post_src_instructions())

    def consume_compositions(self):
        for node in self.serialisedCompositions:
            self.compositions.append(
                PythonComposition(node, PNLTypes.COMPOSITIONS.value)
            )

    def consume_projections(self):
        for node in self.serialisedProjections:
            self.projections.append(
                PythonProjection(node, PNLTypes.PROJECTIONS.value, self.mechanisms)
            )

    def consume_mechanisms(self):
        allMechanismClasses = list(self.serialisedMechanisms.keys())
        for mechanismClass in allMechanismClasses:
            for node in self.serialisedMechanisms[mechanismClass]:
                self.mechanisms.append(PythonMechanism(node, mechanismClass))


class PythonNode:
    def __init__(self, node, pnlClass, params_to_skip=["pnlClass", "Loggables"]):
        self.node = node
        self.pnlClass = pnlClass
        self.nodeName = self.node["name"] if "name" in node else self.node["id"]
        self.params_to_skip = params_to_skip
        self.options = self.extract_options()
        self.pre_src_instructions = []
        self.post_src_instructions = []
        self.fill_pre_src_instructions()
        self.parent = self.compute_parent()
        self.pythonSrc = self.generate_python_src()
        self.fill_post_src_instructions()

    def extract_options(self):
        return list(self.node["class_inputs"].keys())

    def clean_trailing_comma(self, src):
        if src != "" and src[-2:] == ", ":
            return src[:-2]
        return src

    def generate_python_src(self):
        src = (
            self.node["name"]
            + " = "
            + "pnl."
            + self.pnlClass
            + "("
            + self.generate_params()
            + ")"
        )
        return src

    def fill_pre_src_instructions(self):
        pass

    def fill_post_src_instructions(self):
        if "Loggables" in self.node["class_inputs"]:
            for loggable in self.node["class_inputs"]["Loggables"]:
                if self.node["class_inputs"]["Loggables"][loggable] != "OFF":
                    self.post_src_instructions.append(
                        self.node["name"]
                        + ".log.set_log_conditions('"
                        + loggable
                        + "')"
                    )

    def get_post_src_instructions(self):
        return self.post_src_instructions

    def get_pre_src_instructions(self):
        return self.pre_src_instructions

    def generate_params(self):
        params_src = ""
        params = [a for a in self.options if a not in self.params_to_skip]
        for param in params:
            params_src += param + " = " + self.node["class_inputs"][param] + ", "
        if "name" not in params:
            params_src += "name = '" + self.node["name"] + "', "
        return params_src

    def compute_parent(self):
        try:
            return self.node["graphPath"][-2]
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
        self.input_ports = []
        self.output_ports = []
        super(PythonMechanism, self).__init__(
            node, pnlClass, ["pnlClass", "Loggables", "ports", "graphPath"]
        )

    def fill_post_src_instructions(self):
        super().fill_post_src_instructions()

    def generate_params(self):
        params_src = super().generate_params()
        if "ports" in self.node:
            self.input_ports = [
                port
                for port in self.node["ports"]
                if port["type"] == PNLPortTypes.INPUT.value
            ]
            self.output_ports = [
                port
                for port in self.node["ports"]
                if port["type"] == PNLPortTypes.OUTPUT.value
            ]
            if len(self.output_ports) > 0:
                params_src += "output_ports = [" + self.generate_output_ports() + "], "
            if len(self.input_ports) > 0:
                params_src += "input_ports = [" + self.generate_input_ports() + "], "
        return self.clean_trailing_comma(params_src)

    def generate_input_ports(self):
        input_ports_src = ""
        for port in self.input_ports:
            input_ports_src += "'" + port["name"] + "', "
        return self.clean_trailing_comma(input_ports_src)

    def generate_output_ports(self):
        output_ports_src = ""
        for port in self.output_ports:
            output_ports_src += "'" + port["name"] + "', "
        return self.clean_trailing_comma(output_ports_src)


class PythonProjection(PythonNode):
    def __init__(self, node, pnlClass, mechanisms):
        self.sender = None
        self.receiver = None
        self.sender_port = None
        self.receiver_port = None
        self.mechanisms = mechanisms
        super(PythonProjection, self).__init__(node, pnlClass)

    def extract_options(self):
        return list()

    def fill_pre_src_instructions(self):
        self.sender = next(
            filter(lambda x: x.get_name() == self.node["source"], self.mechanisms), None
        )
        self.receiver = next(
            filter(lambda x: x.get_name() == self.node["target"], self.mechanisms), None
        )
        if (
            self.sender is not None
            and hasattr(self.sender, "output_ports")
            and len(self.sender.output_ports) > 1
        ):
            self.sender_port = next(
                filter(
                    lambda x: x["name"] == self.node["sourcePort"]["name"],
                    self.sender.output_ports,
                ),
                None,
            )
            if self.sender_port is not None:
                self.pre_src_instructions.append(
                    self.sender_port["name"]
                    + " = next(filter(lambda x: x.name == '"
                    + self.sender_port["name"]
                    + "', "
                    + self.sender.get_name()
                    + ".ports()), None)"
                )
        if (
            self.receiver is not None
            and hasattr(self.receiver, "input_ports")
            and len(self.receiver.input_ports) > 1
        ):
            self.receiver_port = next(
                filter(
                    lambda x: x["name"] == self.node["targetPort"]["name"],
                    self.receiver.input_ports,
                ),
                None,
            )
            if self.receiver_port is not None:
                self.pre_src_instructions.append(
                    self.receiver_port["name"]
                    + " = next(filter(lambda x: x.name == '"
                    + self.receiver_port["name"]
                    + "', "
                    + self.receiver.get_name()
                    + ".ports()), None)"
                )

    def generate_python_src(self):
        src = (
            self.nodeName
            + " = "
            + "pnl.MappingProjection("
            + self.generate_params()
            + ")"
        )
        return src

    def generate_params(self):
        params_src = ""
        # check if sender is a port or the mechanism
        if self.sender_port is not None:
            params_src += "sender = " + self.sender_port["name"] + ", "
        else:
            params_src += "sender = " + self.sender.get_name() + ", "
        # check if receiver is a port or the mechanism
        if self.receiver_port is not None:
            params_src += "receiver = " + self.receiver_port["name"] + ", "
        else:
            params_src += "receiver = " + self.receiver.get_name() + ", "
        # return params with trailing comma removed
        if hasattr(self, "nodeName") and self.nodeName is not None:
            params_src += "name = '" + self.nodeName + "', "
        return self.clean_trailing_comma(params_src)

    def compute_parent(self):
        if self.sender is not None and self.sender.parent is not None:
            return self.sender.parent
        elif self.receiver is not None and self.receiver.parent is not None:
            return self.receiver.parent
        return None

    def fill_post_src_instructions(self):
        pass


class PythonComposition(PythonNode):
    def __init__(self, node, pnlClass):
        super(PythonComposition, self).__init__(
            node, pnlClass, ["pnlClass", "Loggables", "ports", "graphPath"]
        )

    def generate_params(self):
        params_src = super().generate_params()
        return self.clean_trailing_comma(params_src)
