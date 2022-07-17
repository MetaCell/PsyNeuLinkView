import { castObject } from './utils';
const parse = require('dotparser');


export default class ModelInterpreter {
    nativeModel: any;
    jsonModel: Object;

    constructor(model: any) {
        this.nativeModel = model;
        this.jsonModel = this._convertModel(model);
    }

    _convertModel(model: any) : Object {
        const parsedModel = {
            'compositions': [],
            'mechanisms': [],
        };

        parsedModel.compositions = model.compositions.map((singleModel: any) => {
            const newModel = parse(singleModel).map((elem: any) => castObject(elem));
            return newModel;
        });

        parsedModel.mechanisms = model.mechanisms.map((singleNode: any) => {
            let tempNode = parse(singleNode)[0].children.filter((elem: { node_id: { id: string; }; }) => elem.node_id.id !== 'graph');
            let newNode = tempNode.map((elem: any) => castObject(elem));
            return newNode;
        });

        return parsedModel;
    }

    updateModel(newModel: any) {
        this.jsonModel = this._convertModel(newModel);
    }

    getModel() {
        return this.jsonModel;
    }

    getNativeModel() {
        return this.nativeModel;
    }
}