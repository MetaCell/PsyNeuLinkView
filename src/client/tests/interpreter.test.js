import { MetaLink, MetaLinkModel, MetaNode, MetaNodeModel } from '@metacell/meta-diagram';
import { PNLClasses } from '../../constants';
import ModelSingleton from '../model/ModelSingleton';
const mockModel = require('../resources/model').mockModel;

// write a test to instantiate the model singleton with the mock model and retrieve the singleton instance
function testModelSingleton() {
    ModelSingleton.initInstance(mockModel);
    const singleton = ModelSingleton.getInstance();
    return singleton;
}

function findInput(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.getName() === 'input') {
            resultNode = item
        }
    });
    return resultNode;
}

function findMid(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.getName() === 'mid') {
            resultNode = item
        }
    });
    return resultNode;
}


function findOutput(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.getName() === 'output') {
            resultNode = item
        }
    });
    return resultNode;
}


function findSingle(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.getName() === 'single_node') {
            resultNode = item
        }
    });
    return resultNode;
}

function findLink1(model) {
    let resultNode = undefined;
    model[PNLClasses.PROJECTION].forEach(item => {
        if (item.getName() === 'link_input-to-mid') {
            resultNode = item
        }
    });
    return resultNode;
}

function findLink2(model) {
    let resultNode = undefined;
    model[PNLClasses.PROJECTION].forEach(item => {
        if (item.getName() === 'link_mid-to-output') {
            resultNode = item
        }
    });
    return resultNode;
}

// const convertedModel = testConvertModel()

// Check the model singleton is instantiated and retrieved
test('model singleton instantiation and retrieval', () => {
    expect(testModelSingleton()).toBeDefined()
});

// check that we can retrieve the metagraph from the model singleton
test('model singleton metagraph retrieval', () => {
    expect(testModelSingleton().getMetaGraph()).toBeDefined()
});

// check that we can retrieve the meta tree from the model singleton
test('model singleton metatree retrieval', () => {
    expect(testModelSingleton().getTreeModel()).toBeDefined()
});

// Check the number of nodes (composition and mechanisms are both metanodemodel instances) and links are right
test('Check the number of nodes', () => {
    expect(testModelSingleton().getMetaGraph().getNodes().length).toBe(5)
});

test('Check the number links', () => {
    expect(testModelSingleton().getMetaGraph().getLinks().length).toBe(2)
});

test('Check the number of compositions', () => {
    expect(testModelSingleton().getModel()[PNLClasses.COMPOSITION].length).toBe(1)
});

test('Check the number of mechanisms', () => {
    expect(testModelSingleton().getModel()[PNLClasses.MECHANISM].length).toBe(4)
});


test('Check the number projections', () => {
    expect(testModelSingleton().getModel()[PNLClasses.PROJECTION].length).toBe(2)
});



// Check the existence of the expected nodes in the mockmodel
test('Check that input node exists', () => {
    const result = findInput(testModelSingleton().getModel())
    expect(result.getName()).toBe('input')
});

test('Check that mid node exists', () => {
    const result = findMid(testModelSingleton().getModel())
    expect(result.getName()).toBe('mid')
});

test('Check that output node exists', () => {
    const result = findOutput(testModelSingleton().getModel())
    expect(result.getName()).toBe('output')
});

test('Check that single_node node exists', () => {
    const result = findSingle(testModelSingleton().getModel())
    expect(result.getName()).toBe('single_node')
});

test('Check that the link from input to mid exists', () => {
    const result = findLink1(testModelSingleton().getModel())
    expect(result.getName()).toBe('link_input-to-mid')
});

test('Check that the link from mid to output exists', () => {
    const result = findLink2(testModelSingleton().getModel())
    expect(result.getName()).toBe('link_mid-to-output')
});

// Check that the ports of the internal model are correct
test('Check input ports on getPorts api method', () => {
    const result = findInput(testModelSingleton().getModel())
    expect(result.getPorts()).toEqual({
        "InputPort": ["InputPort-0"], 
        "OutputPort": ["OutputPort-0"], 
        "ParameterPort": ["intercept", "slope"]
    })
});

// Check that meta link input gets converted toModel correctly
test('Check that the meta link input gets converted to MetaLink correctly', () => {
    const result = findLink1(testModelSingleton().getModel())
    expect(result.getMetaLink()).toBeInstanceOf(MetaLink)
});

// Check that the meta node input gets converted toModel correctly
test('Check that the meta node input gets converted to MetaNode correctly', () => {
    let result = findInput(testModelSingleton().getModel())
    expect(result.getMetaNode()).toBeInstanceOf(MetaNode)
});

// Check that meta link input gets converted toModel to MetaLinkModel correctly
test('Check that the meta link input gets converted toModel correctly', () => {
    const result = findLink1(testModelSingleton().getModel())
    expect(result.getMetaLink().toModel()).toBeInstanceOf(MetaLinkModel)
});

// Check that the meta node input gets converted toModel to MetaNodeModel correctly
test('Check that the meta node input gets converted toModel correctly', () => {
    let result = findInput(testModelSingleton().getModel())
    expect(result.getMetaNode().toModel()).toBeInstanceOf(MetaNodeModel)
});
