import psyneulink as pnl

A = pnl.ProcessingMechanism(name='A')
B = pnl.ProcessingMechanism(name='B')
C = pnl.ProcessingMechanism(name='C')
D = pnl.ProcessingMechanism(name='D')
E = pnl.ProcessingMechanism(name='E')
comp = pnl.Composition(name='comp1')
comp.add_backpropagation_learning_pathway(pathway=[A, D, E])
comp.add_backpropagation_learning_pathway(pathway=[A, B, C])
