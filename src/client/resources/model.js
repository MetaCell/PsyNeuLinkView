const modelJson = require('./model.json');
// const singleNodes = require('./single_nodes.json');
const { PNLClasses, PNLMechanisms } = require("../../constants");
const summary = require('./summaries.json');
// TODO: add mock for loggables
const loggables = {};

export const model = {
        [PNLClasses.COMPOSITION]: modelJson,
        [PNLMechanisms.MECHANISM]: []
}

export const mockModel = model;
export const mockSummary = summary;
export const mockLoggables = loggables;
