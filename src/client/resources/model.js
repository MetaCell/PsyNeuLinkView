const modelJson = require('./model.json');
const singleNodes = require('./single_nodes.json');
const { PNLClasses, PNLMechanisms } = require("../../constants");

export const mockModel = {
        [PNLClasses.COMPOSITION]: [modelJson],
        [PNLMechanisms.MECHANISM]: singleNodes.objects
}

// module.exports = {
//         'mockModel': model,
// };
