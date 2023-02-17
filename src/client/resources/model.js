const modelJson = require('./model.json');
const singleNodes = require('./single_nodes.json');
const { PNLClasses } = require("../../constants");

const model = {
        [PNLClasses.COMPOSITION]: [modelJson],
        [PNLClasses.MECHANISM]: singleNodes.objects
}

module.exports = {
        'mockModel': model,
};
