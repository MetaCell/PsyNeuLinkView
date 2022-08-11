import { buildModel } from '../model/utils';
import ModelInterpreter from '../model/Interpreter';
import { PNLClasses } from '../constants';
const mockModel = require('../resources/model').mockModel;

function testConvertModel() {
    const interpreter = new ModelInterpreter(mockModel);
    const model = interpreter.getModel();
    const metaModel = buildModel(model);
    return metaModel;
}

function findInput(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.options.options.get('name') === 'input') {
            resultNode = item
        }
    });
    return resultNode;
}

function findMid(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.options.options.get('name') === 'mid') {
            resultNode = item
        }
    });
    return resultNode;
}


function findOutput(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.options.options.get('name') === 'output') {
            resultNode = item
        }
    });
    return resultNode;
}


function findSingle(model) {
    let resultNode = undefined;
    model[PNLClasses.MECHANISM].forEach(item => {
        if (item.options.options.get('name') === 'single_node') {
            resultNode = item
        }
    });
    return resultNode;
}

function findLink1(model) {
    let resultNode = undefined;
    model[PNLClasses.PROJECTION].forEach(item => {
        if (item.options.options.get('name') === 'link_input-to-mid') {
            resultNode = item
        }
    });
    return resultNode;
}

function findLink2(model) {
    let resultNode = undefined;
    model[PNLClasses.PROJECTION].forEach(item => {
        if (item.options.options.get('name') === 'link_mid-to-output') {
            resultNode = item
        }
    });
    return resultNode;
}

const convertedModel = testConvertModel()
// console.log(convertedModel[PNLClasses.PROJECTION][0])

// Check the number of nodes and links are right

test('Convert graphviz model nodes to MetaNode', () => {
    expect(convertedModel[PNLClasses.MECHANISM].length).toBe(4)
});

test('Convert graphviz model links to MetaLink', () => {
    expect(convertedModel[PNLClasses.PROJECTION].length).toBe(2)
});

// Check the existence of the expected nodes in the mockmodel

test('Check that input node exists', () => {
    let result = findInput(convertedModel)
    expect(result.options.getName()).toBe('input')
});

test('Check that mid node exists', () => {
    let result = findMid(convertedModel)
    expect(result.options.getName()).toBe('mid')
});

test('Check that output node exists', () => {
    let result = findOutput(convertedModel)
    expect(result.options.getName()).toBe('output')
});

test('Check that single_node node exists', () => {
    let result = findSingle(convertedModel)
    expect(result.options.getName()).toBe('single_node')
});

test('Check that the link from input to mid exists', () => {
    let result = findLink1(convertedModel)
    expect(result.options.getName()).toBe('link_input-to-mid')
});

test('Check that the link from mid to output exists', () => {
    let result = findLink2(convertedModel)
    expect(result.options.getName()).toBe('link_mid-to-output')
});

// Check api methods for meta node and meta link

test('Check MetaNode getName api method', () => {
    let result = findInput(convertedModel)
    expect(result.getName()).toBe('input')
    expect(result.getName()).toBe(result.options.options.get('name'))
});

test('Check MetaNode getId api method', () => {
    let result = findInput(convertedModel)
    expect(result.getId()).toBe('input')
    expect(result.getId()).toBe(result.options.options.get('id'))
});

test('Check MetaNode getShape api method', () => {
    let result = findInput(convertedModel)
    expect(result.getShape()).toBe('mechanism')
    expect(result.getShape()).toBe(result.options.options.get('shape'))
});

test('Check MetaLink getSourceId api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getSourceId()).toBe('input')
    expect(result.getSourceId()).toBe(result.sourceId)
});

test('Check MetaLink getSourcePortId api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getSourcePortId()).toBe('out')
    expect(result.getSourcePortId()).toBe(result.sourcePortId)
});

test('Check MetaLink getTargetId api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getTargetId()).toBe('mid')
    expect(result.getTargetId()).toBe(result.targetId)
});

test('Check MetaLink getTargetPortId api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getTargetPortId()).toBe('in');
    expect(result.getTargetPortId()).toBe(result.targetPortId);
});

test('Check MetaLink getName api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getName()).toBe('link_input-to-mid')
    expect(result.getName()).toBe(result.options.options.get('name'))
});

test('Check MetaLink getId api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getId()).toBe('link_input-to-mid')
    expect(result.getId()).toBe(result.options.options.get('id'))
});

test('Check MetaLink getShape api method', () => {
    let result = findLink1(convertedModel)
    expect(result.getShape()).toBe('projection')
    expect(result.getShape()).toBe(result.options.options.get('shape'))
});