import React from 'react';
import {generateMetaGraph} from './utils';
import ModelInterpreter from './Interpreter';
import { MetaNodeToOptions } from './nodes/utils';
import {Graph, MetaGraph} from './graph/MetaGraph';
import {PNLClasses, PNLLoggables, PNLMechanisms} from '../../constants';
import {ComponentsMap, MetaNodeModel} from '@metacell/meta-diagram';
import Composition from '../components/views/editView/compositions/Composition';
import CustomLinkWidget from '../components/views/editView/projections/CustomLinkWidget';
import DDM from '../components/views/editView/mechanisms/DDM/DDM';
import LCAMechanism from '../components/views/editView/mechanisms/LCAMechanism/LCAMechanism';
import KWTAMechanism from '../components/views/editView/mechanisms/KWTAMechanism/KWTAMechanism';
import GatingMechanism from '../components/views/editView/mechanisms/GatingMechanism/GatingMechanism';
import ControlMechanism from '../components/views/editView/mechanisms/ControlMechanism/ControlMechanism';
import KohonenMechanism from '../components/views/editView/mechanisms/KohonenMechanism/KohonenMechanism';
import LearningMechanism from '../components/views/editView/mechanisms/LearningMechanism/LearningMechanism';
import TransferMechanism from '../components/views/editView/mechanisms/TransferMechanism/TransferMechanism';
import LCControlMechanism from '../components/views/editView/mechanisms/LCControlMechanism/LCControlMechanism';
import ObjectiveMechanism from '../components/views/editView/mechanisms/ObjectiveMechanism/ObjectiveMechanism';
import AGTControlMechanism from '../components/views/editView/mechanisms/AGTControlMechanism/AGTControlMechanism';
import ComparatorMechanism from '../components/views/editView/mechanisms/ComparatorMechanism/ComparatorMechanism';
import IntegratorMechanism from '../components/views/editView/mechanisms/IntegratorMechanism/IntegratorMechanism';
import ModulatoryMechanism from '../components/views/editView/mechanisms/ModulatoryMechanism/ModulatoryMechanism';
import OptControlMechanism from '../components/views/editView/mechanisms/OptControlMechanism/OptControlMechanism';
import ProcessingMechanism from '../components/views/editView/mechanisms/ProcessingMechanism/ProcessingMechanism';
import ContrastiveMechanism from '../components/views/editView/mechanisms/ContrastiveMechanism/ContrastiveMechanism';
import AutoLearningMechanism from '../components/views/editView/mechanisms/AutoLearningMechanism/AutoLearningMechanism';
import EpisodicMemoryMechanism from '../components/views/editView/mechanisms/EpisodicMemoryMechanism/EpisodicMemoryMechanism';
import PredictionErrorMechanism from '../components/views/editView/mechanisms/PredictionErrorMechanism/PredictionErrorMechanism';
import KohonenLearningMechanism from '../components/views/editView/mechanisms/KohonenLearningMechanism/KohonenLearningMechanism';
import DefaultProcessingMechanism from '../components/views/editView/mechanisms/DefaultProcessingMechanism/DefaultProcessingMechanism';
import RecurrentTransferMechanism from '../components/views/editView/mechanisms/RecurrentTransferMechanism/RecurrentTransferMechanism';
import CompositionInterfaceMechanism from '../components/views/editView/mechanisms/CompositionInterfaceMechanism/CompositionInterfaceMechanism';
import { MetaPort } from '@metacell/meta-diagram';

class treeNode {
    public metaNode: MetaNodeModel | undefined;
    public id: String | undefined;
    public label: String | undefined;
    public tooltip: String | undefined;
    public type: PNLClasses | undefined;
    public items: Array<any> | undefined;

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
    private static generateTreeModel: Function;
    private static summaries: any;
    private static loggables: any;
    private static metaRef: React.MutableRefObject<any>;

    private constructor(inputModel: any, inputLoggables: any) {
        ModelSingleton.metaRef = React.createRef();
        ModelSingleton.componentsMap = new ComponentsMap(new Map(), new Map());
        ModelSingleton.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
        // TODO: the PNLMechanisms.MECHANISM is not used anymore since we are defininig the classes.
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.DDM, DDM);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LCA_MECH, LCAMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KWTA_MECH, KWTAMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.CTRL_MECH, ControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.GATING_MECH, GatingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.OBJ_MECH, ObjectiveMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KOHONEN_MECH, KohonenMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.MECHANISM, ProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LEARNING_MECH, LearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LC_CTRL_MECH, LCControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.TRANSFER_MECH, TransferMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.AGT_CTRL_MECH, AGTControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.OPT_CTRL_MECH, OptControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.COMPARATOR_MECH, ComparatorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.INTEGRATOR_MECH, IntegratorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.MODULATORY_MECH, ModulatoryMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.PROCESSING_MECH, ProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.CONTRASTIVE_MECH, ContrastiveMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.EPISODIC_MECH, EpisodicMemoryMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.AUTO_LEARNING_MECH, AutoLearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.COMPOSITION_MECH, CompositionInterfaceMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KOHONEN_LEARNING_MECH, KohonenLearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.PREDICTION_ERROR_MECH, PredictionErrorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.DEFAULT_PROCESSING_MECH, DefaultProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.RECURRENT_TRANSFER_MECH, RecurrentTransferMechanism);
        ModelSingleton.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

        [...Object.values(PNLClasses), ...Object.values(PNLMechanisms)].forEach((key) => {
            if (inputModel[key] === undefined) {
                inputModel[key] = [];
            }
        });
        ModelSingleton.interpreter = new ModelInterpreter(inputModel, inputLoggables);
        ModelSingleton.model = ModelSingleton.interpreter.getModel();

        ModelSingleton.metaGraph = generateMetaGraph([
            ...ModelSingleton.interpreter.getMetaModel()[PNLClasses.COMPOSITION],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.MECHANISM],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.PROCESSING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.DEFAULT_PROCESSING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.AUTO_LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.GATING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.AGT_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.OPT_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LC_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.MODULATORY_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.COMPOSITION_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.INTEGRATOR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.OBJ_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.TRANSFER_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.RECURRENT_TRANSFER_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.DDM],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.EPISODIC_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.COMPARATOR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.PREDICTION_ERROR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.CONTRASTIVE_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KOHONEN_LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KOHONEN_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KWTA_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LCA_MECH],
        ]);
        // @ts-ignore
        ModelSingleton.metaGraph.addLinks(ModelSingleton.interpreter.getMetaModel()[PNLClasses.PROJECTION]);
        this.updateTreeModel()
    }

    static setSummaries(summaries: any) {
        ModelSingleton.summaries = summaries;
    }

    static setLoggables(loggables: any) {
        ModelSingleton.loggables = loggables;
    }

    static getNodeType(nodeName: string) {
        if (ModelSingleton.summaries[nodeName]) {
            // Note, the replace below is required due to a transformation done by the library PSNL itself
            return ModelSingleton.summaries[nodeName][nodeName.replace('-', '_')].metadata.type;
        }
        return 'unknown';
    }

    static flushModel(model: any, summaries: any, loggables: any) {
        ModelSingleton.componentsMap = new ComponentsMap(new Map(), new Map());
        ModelSingleton.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
        // TODO: the PNLMechanisms.MECHANISM is not used anymore since we are defininig the classes.
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.DDM, DDM);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LCA_MECH, LCAMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KWTA_MECH, KWTAMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.CTRL_MECH, ControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.GATING_MECH, GatingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.OBJ_MECH, ObjectiveMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KOHONEN_MECH, KohonenMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.MECHANISM, ProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LEARNING_MECH, LearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.LC_CTRL_MECH, LCControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.TRANSFER_MECH, TransferMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.AGT_CTRL_MECH, AGTControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.OPT_CTRL_MECH, OptControlMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.COMPARATOR_MECH, ComparatorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.INTEGRATOR_MECH, IntegratorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.MODULATORY_MECH, ModulatoryMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.PROCESSING_MECH, ProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.CONTRASTIVE_MECH, ContrastiveMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.EPISODIC_MECH, EpisodicMemoryMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.AUTO_LEARNING_MECH, AutoLearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.COMPOSITION_MECH, CompositionInterfaceMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.KOHONEN_LEARNING_MECH, KohonenLearningMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.PREDICTION_ERROR_MECH, PredictionErrorMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.DEFAULT_PROCESSING_MECH, DefaultProcessingMechanism);
        ModelSingleton.componentsMap.nodes.set(PNLMechanisms.RECURRENT_TRANSFER_MECH, RecurrentTransferMechanism);
        ModelSingleton.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

        ModelSingleton.setSummaries(summaries);
        ModelSingleton.setLoggables(loggables);
        [...Object.values(PNLClasses), ...Object.values(PNLMechanisms)].forEach((key) => {
            if (model[key] === undefined) {
                model[key] = [];
            }
        });
        ModelSingleton.interpreter = new ModelInterpreter(model, loggables);
        ModelSingleton.model = ModelSingleton.interpreter.getModel();

        ModelSingleton.metaGraph = generateMetaGraph([
            ...ModelSingleton.interpreter.getMetaModel()[PNLClasses.COMPOSITION],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.MECHANISM],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.PROCESSING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.DEFAULT_PROCESSING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.AUTO_LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.GATING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.AGT_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.OPT_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LC_CTRL_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.MODULATORY_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.COMPOSITION_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.INTEGRATOR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.OBJ_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.TRANSFER_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.RECURRENT_TRANSFER_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.DDM],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.EPISODIC_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.COMPARATOR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.PREDICTION_ERROR_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.CONTRASTIVE_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KOHONEN_LEARNING_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KOHONEN_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.KWTA_MECH],
            ...ModelSingleton.interpreter.getMetaModel()[PNLMechanisms.LCA_MECH],
        ]);
        // @ts-ignore
        ModelSingleton.metaGraph.addLinks(ModelSingleton.interpreter.getMetaModel()[PNLClasses.PROJECTION]);
        ModelSingleton.treeModel = ModelSingleton.getInstance().generateTreeModel();
    }

    static initInstance(model: any, loggables: any) {
        if (!ModelSingleton.instance) {
            ModelSingleton.instance = new ModelSingleton(model, loggables)
        }
        return ModelSingleton.instance;
    }

    static getInstance(): ModelSingleton {
        if (!ModelSingleton.instance) {
            ModelSingleton.instance = new ModelSingleton({}, {})
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

    public updateTreeModel() {
        ModelSingleton.treeModel = this.generateTreeModel();
    }

    public updateModel(node: MetaNodeModel, newX: number, newY: number): any {
        const pathUpdated = ModelSingleton.metaGraph.updateGraph(
            node,
            newX,
            newY,
        );
        if (pathUpdated) {
            this.updateTreeModel()
        }

    }

    public getMetaRef(): Object {
        return ModelSingleton.metaRef;
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
        const serialisedModel: { [key: string]: Array<any> } = {};

        Object.values(PNLClasses).forEach((key) => {
            serialisedModel[key] = [];
        });

        Object.values(PNLMechanisms).forEach((key) => {
            serialisedModel[key] = [];
        });

        // From the roots, traverse all the graphs and serialise all the elements in the graph
        ModelSingleton.metaGraph.getRoots().forEach((graph, id) => {
            this.traverseGraph(graph, (node) => {
                const propsToCheck = ['pnlClass', PNLLoggables];
                let propsToSerialise: any[] = [];
                if (MetaNodeToOptions.hasOwnProperty(node.getOption('pnlClass'))) {
                    propsToSerialise = Object.keys(MetaNodeToOptions[node.getOption('pnlClass')])
                }
                propsToCheck.forEach((prop) => {
                    if (node.getOption(prop) !== undefined) {
                        propsToSerialise.push(prop);
                    }
                })
                let nodeSerialised = node.serialise(propsToSerialise);
                if (node.getOption('ports') !== undefined) {
                    nodeSerialised.ports = [];
                    node.getOption('ports').forEach((port: MetaPort) => {
                        nodeSerialised.ports.push(port.serialise());
                    })
                }
                serialisedModel[node.getOption('pnlClass')].unshift(nodeSerialised);
            })
        })
        // Links are stored at the global level in the MetaGraph
        ModelSingleton.metaGraph.getLinks().forEach((link, id) => {
            serialisedModel[link.getOption('pnlClass')].unshift(link.serialise(['pnlClass']));
        })
        return serialisedModel;
    }

    private traverseGraph(graph: Graph, fn: (node: MetaNodeModel) => void): any {
        const node = graph.getNode();
        fn(node);
        graph.getChildrenGraphs().forEach((childGraph, id) => {
            this.traverseGraph(childGraph, fn);
        })

    }
}
