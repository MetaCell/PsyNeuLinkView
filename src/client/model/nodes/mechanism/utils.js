import { FunctionsParams, OptionsTypes } from "../utils";

export const extractParams = (base, params, isThisFromSummary) => {
    if (base.hasOwnProperty('functions') && base.hasOwnProperty('metadata')) {
        for (const key in params) {
            if (key === 'function') {
                params[key] = extractFunction(base.functions[Object.keys(base.functions)[0]], isThisFromSummary)
            } else {
                params[key] = extractByType(key, base, isThisFromSummary);
            }
        }
    }
    return params;
};


const extractByType = (key, functionObj, isThisFromSummary) => {
    const nodeType = functionObj.metadata.type;
    const paramInfo = OptionsTypes[nodeType][key];
    if (paramInfo.hasOwnProperty('type') && functionObj.metadata.hasOwnProperty(key)) {
        switch (paramInfo.type) {
            case 'number':
            case 'string':
            case 'boolean':
                return extractPrimitive(functionObj.metadata[key], isThisFromSummary);
            case 'array':
                return extractArray(functionObj.metadata[key], isThisFromSummary);
            case 'function':
                //TODO: add functions object for each function property 
                // return extractFunction(functionObj.metadata[key][Object.keys(functionObj.metadata[key])[0]], isThisFromSummary);
                return extractFunction(functionObj.functions[Object.keys(functionObj.functions)[0]], isThisFromSummary);
            default:
                return '';
        }
    }
    return '';
}


const extractFunction = (functionObj, isThisFromSummary) => {
    const functionType = functionObj.metadata.type;
    const functionParams = FunctionsParams[functionType];
    let functionString = 'pnl.' + functionType + '(';
    for (const funcParam in functionParams) {
        if ((isThisFromSummary || functionParams[funcParam].required) && functionObj.args.hasOwnProperty(funcParam)) {
            functionString += funcParam + '=' + functionObj.args[funcParam] + ',';
        }
    }
    functionString += ')';
    return functionString;
}


const extractPrimitive = (functionObj, isThisFromSummary) => {
    return functionObj;
}

const extractArray = (functionObj, isThisFromSummary) => {
    let arrayString = '[';
    for (const arrayItem in functionObj) {
        arrayString += extractPrimitive(functionObj[arrayItem], isThisFromSummary) + ',';
    }
    arrayString += ']';
    return arrayString;
}