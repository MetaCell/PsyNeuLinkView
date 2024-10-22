import psyneulink as pnl
from psyneulink import *

C = pnl.ProcessingMechanism(function = pnl.Linear(slope=1,intercept=0,), name = 'C', output_ports = ['C_OutputPort_0'], input_ports = ['C_InputPort_0'])
B = pnl.ProcessingMechanism(function = pnl.Linear(slope=1,intercept=0,), name = 'B', output_ports = ['B_OutputPort_0'], input_ports = ['B_InputPort_0'])
E = pnl.ProcessingMechanism(function = pnl.Linear(slope=1,intercept=0,), name = 'E', output_ports = ['E_OutputPort_0'], input_ports = ['E_InputPort_0'])
D = pnl.ProcessingMechanism(function = pnl.Linear(slope=1,intercept=0,), name = 'D', output_ports = ['D_OutputPort_0'], input_ports = ['D_InputPort_0'])
A = pnl.ProcessingMechanism(function = pnl.Linear(slope=1,intercept=0,), name = 'A', output_ports = ['A_OutputPort_0'], input_ports = ['A_InputPort_0'])
link_B_to_C = pnl.MappingProjection(sender = B, receiver = C, name = 'link_B_to_C')
link_A_to_B = pnl.MappingProjection(sender = A, receiver = B, name = 'link_A_to_B')
link_D_to_E = pnl.MappingProjection(sender = D, receiver = E, name = 'link_D_to_E')
link_A_to_D = pnl.MappingProjection(sender = A, receiver = D, name = 'link_A_to_D')
comp1 = pnl.Composition(name = 'comp1')

comp1.add_node(C)
comp1.add_node(B)
comp1.add_node(E)
comp1.add_node(D)
comp1.add_node(A)

comp1.add_projection(link_B_to_C)
comp1.add_projection(link_A_to_B)
comp1.add_projection(link_D_to_E)
comp1.add_projection(link_A_to_D)


