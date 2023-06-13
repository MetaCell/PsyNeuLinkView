const modelJson = require('./model.json');
const singleNodes = require('./single_nodes.json');
const { PNLClasses, PNLMechanisms } = require("../../constants");

const model = {
        [PNLClasses.COMPOSITION]: [modelJson],
        [PNLMechanisms.MECHANISM]: singleNodes.objects
}

export const mockModel = model;
