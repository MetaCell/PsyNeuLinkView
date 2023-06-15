const modelJson = require('./model.json');
// const singleNodes = require('./single_nodes.json');
const { PNLClasses, PNLMechanisms, PNLSummary } = require("../../constants");
const summary = require('./summaries.json');

export const model = {
        [PNLClasses.COMPOSITION]: modelJson,
        [PNLMechanisms.MECHANISM]: []
}

export const mockModel = model;
export const mockSummary = summary;
