import { PNLClasses } from '../constants';
import { generateMetaGraph } from './utils';
import ModelInterpreter from './Interpreter';
import { Graph, MetaGraph } from './graph/MetaGraph';
import { ComponentsMap, MetaNodeModel } from '@metacell/meta-diagram';
import Composition from '../components/views/editView/compositions/Composition';
import GenericMechanism from '../components/views/editView/mechanisms/GenericMechanism';
import CustomLinkWidget from '../components/views/editView/projections/CustomLinkWidget';


class treeNode {
    public metaNode: MetaNodeModel|undefined;
    public id: String|undefined;
    public label: String|undefined;
    public tooltip: String|undefined;
    public type: PNLClasses|undefined;
    public items: Array<any>|undefined;

    constructor(originalNode: MetaNodeModel) {
        this.metaNode = originalNode;
        this.id = originalNode.getID();
        this.label = originalNode.getID();
        this.tooltip = originalNode.getID();
        this.type = originalNode.getOption('pnlClass');
        this.items = [];
    }

    public addItem(child: treeNode) {
        this.items?.push(child);
    }
}

export default class ModelSingleton {
    private static instance: ModelSingleton;
    private static componentsMap: any;
    private static interpreter: ModelInterpreter;
    private static model: Object;
    private static metaGraph: MetaGraph;
    private static treeModel: Array<any>;

    private constructor(inputModel: any) {
        ModelSingleton.componentsMap = new ComponentsMap(new Map(), new Map());
        ModelSingleton.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
        ModelSingleton.componentsMap.nodes.set(PNLClasses.MECHANISM, GenericMechanism);
        ModelSingleton.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

        ModelSingleton.interpreter = new ModelInterpreter(inputModel);
        ModelSingleton.model = ModelSingleton.interpreter.getModel();

        ModelSingleton.metaGraph = generateMetaGraph([
            ...ModelSingleton.interpreter.getMetaModel()[PNLClasses.COMPOSITION],
            ...ModelSingleton.interpreter.getMetaModel()[PNLClasses.MECHANISM],
        ]);
        // @ts-ignore
        ModelSingleton.metaGraph.addLinks(ModelSingleton.interpreter.getMetaModel()[PNLClasses.PROJECTION]);
        ModelSingleton.treeModel = this.generateTreeModel();
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

    private generateTreeModel(): Array<any> {
        const tree: Array<any> = [];

        ModelSingleton.metaGraph.getRoots().forEach((graph, id) => {
            const newNode = this.buildTreeNode(graph);
            tree.push(newNode);
        })
        return tree;
    }

    private buildTreeNode(graph: Graph): treeNode {
        const newNode = new treeNode(graph.getNode());
        graph.getChildrenGraphs().forEach((childGraph, id) => {
            newNode.addItem(this.buildTreeNode(childGraph))
        })
        return newNode;
    }

    public updateModel(node: MetaNodeModel, newX: number, newY: number): any {
        const pathUpdated = ModelSingleton.metaGraph.updateGraph(
            node,
            newX,
            newY,
        );
        ModelSingleton.interpreter.updateModel(node);
        if (pathUpdated) {
            ModelSingleton.treeModel = this.generateTreeModel();
        }
    }

    public getModel(): Object {
        return ModelSingleton.model;
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

    public getTreeModel(): any {
        return ModelSingleton.treeModel;
    }

    public serializeModel(): any {
        const serialisedModel: {[key: string]: Array<any>} = {
            [PNLClasses.COMPOSITION]: [],
            [PNLClasses.MECHANISM]: [],
            [PNLClasses.PROJECTION]: [],
        };

        // From the roots, traverse all the graphs and serialise all the elements in the graph
        ModelSingleton.metaGraph.getRoots().forEach((graph, id) => {
            this.traverseGraph(graph, serialisedModel);
        })
        // Links are stored at the global level in the MetaGraph
        ModelSingleton.metaGraph.getLinks().forEach((link, id) => {
            serialisedModel[link.getOption('pnlClass')].unshift(link.serialise(['pnlClass']));
        })
        return serialisedModel;
    }

    private traverseGraph(graph: Graph, serialisedModel: {[key: string]: Array<any>}): any {
        const newNode = graph.getNode();
        serialisedModel[newNode.getOption('pnlClass')].unshift(newNode.serialise(['pnlClass']));
        graph.getChildrenGraphs().forEach((childGraph, id) => {
            this.traverseGraph(childGraph, serialisedModel);
        })
    }
}