import psyneulink as pnl

input1 = pnl.ProcessingMechanism(name='input1')
mid1 = pnl.ProcessingMechanism(name='mid1', function=pnl.Linear(slope=2))
output1 = pnl.ProcessingMechanism(function=pnl.Linear(slope=2))

comp1 = pnl.Composition(
    name='comp1',
    pathways=[input1, mid1, output1]
)


outerInput = pnl.ProcessingMechanism(name='outerInput')
outerOutput = pnl.ProcessingMechanism(name='outerOutput', function=pnl.Linear(slope=2))


outerComp = pnl.Composition(
    name='outerComp',
    pathways=[outerInput, comp1, outerOutput]
)

input2 = pnl.ProcessingMechanism(name='input2')
mid2 = pnl.ProcessingMechanism(name='mid2', function=pnl.Linear(slope=2))
output2 = pnl.ProcessingMechanism(name='output2', function=pnl.Linear(slope=2))

comp2 = pnl.Composition(
    name='comp2',
    pathways=[input2, mid2, output2]
)
