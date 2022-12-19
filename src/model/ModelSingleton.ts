import { PNLClasses } from '../constants';
import { generateMetaGraph } from './utils';
import ModelInterpreter from './Interpreter';
import { ComponentsMap } from '@metacell/meta-diagram';
import { MetaGraph } from '../components/graph/MetaGraph';
import { MetaLink, MetaNode } from '@metacell/meta-diagram';
import Composition from '../components/views/editView/compositions/Composition';
import GenericMechanism from '../components/views/editView/mechanisms/GenericMechanism';
import CustomLinkWidget from '../components/views/editView/projections/CustomLinkWidget';

export default class ModelSingleton {
    private static instance: ModelSingleton;
    private static componentsMap: any;
    private static interpreter: ModelInterpreter;
    private static model: Object;
    private static metaModel: { [key: string]: Array<MetaNode|MetaLink> };
    private static metaGraph: MetaGraph;

    private constructor(inputModel: any) {
        ModelSingleton.componentsMap = new ComponentsMap(new Map(), new Map());
        ModelSingleton.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
        ModelSingleton.componentsMap.nodes.set(PNLClasses.MECHANISM, GenericMechanism);
        ModelSingleton.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

        ModelSingleton.interpreter = new ModelInterpreter(inputModel);
        ModelSingleton.model = ModelSingleton.interpreter.getModel();
        ModelSingleton.metaModel = ModelSingleton.interpreter.getMetaModel();

        ModelSingleton.metaGraph = generateMetaGraph([
            ...ModelSingleton.metaModel[PNLClasses.COMPOSITION],
            ...ModelSingleton.metaModel[PNLClasses.MECHANISM],
        ]);
        // const links = ModelSingleton.metaModel[PNLClasses.PROJECTION].filter((item: any) => {return (item instanceof MetaLink)});
        // @ts-ignore
        ModelSingleton.metaGraph.addLinks(ModelSingleton.metaModel[PNLClasses.PROJECTION]);
    }

    static initInstance(initModel: any) {
        if (!ModelSingleton.instance) {
            ModelSingleton.instance = new ModelSingleton(initModel)
        }
        return ModelSingleton.instance;
    }

    static getInstance(): ModelSingleton {
        if (!ModelSingleton.instance) {
            throw Error("Model Singleton has not been initialised yet.");
        }
        return ModelSingleton.instance;
    }

    public updateModel(inputModel: any): ModelSingleton {
        ModelSingleton.instance = new ModelSingleton(inputModel);
        return ModelSingleton.instance;
    }

    public getModel(): Object {
        return ModelSingleton.model;
    }

    public getMetaModel(): any {
        return ModelSingleton.metaModel;
    }

    public getMetaGraph(): MetaGraph {
        return ModelSingleton.metaGraph;
    }

    public getComponentsMap(): ComponentsMap {
        return ModelSingleton.componentsMap;
    }

    public getInterpreter(): ModelInterpreter {
        return ModelSingleton.interpreter;
    }
}