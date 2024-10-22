from psyneulink import *

G = 1.0
k = 0.5
starting_value_LC = 2.0
user_specified_gain = 1.0

A = TransferMechanism(function=Logistic(gain=user_specified_gain), name='A')
B = TransferMechanism(function=Logistic(gain=user_specified_gain), name='B')
# B.output_ports[0].value *= 0.0  # Reset after init | Doesn't matter here b/c default var = zero, no intercept

LC = LCControlMechanism(
    modulated_mechanisms=[A, B],
    base_level_gain=G,
    objective_mechanism=ObjectiveMechanism(
        function=Linear,
        monitor=[B],
        name='LC ObjectiveMechanism'
    )
)
for output_port in LC.output_ports:
    output_port.value *= starting_value_LC

path = [A, B, LC]
S = Composition()
S.add_node(A, required_roles=NodeRole.INPUT)
S.add_linear_processing_pathway(pathway=path)
S.add_node(LC, required_roles=NodeRole.OUTPUT)
LC.reinitialize_when = Never()
# S.show_graph(show_model_based_optimizer=True, show_node_structure=ALL)

# result = S.run(inputs={A: [[1.0], [1.0], [1.0], [1.0], [1.0]]},
#               call_after_trial=functools.partial(report_trial, S))