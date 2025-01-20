import pnlStore from "../../../redux/store";
import {Point} from "@projectstorm/geometry";
import { PNLClasses, PNLDefaults, PNLLoggables } from "../../../../constants";
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import CompositionNode from '../composition/CompositionNode';
import { MetaNode, MetaPort, PortTypes } from '@metacell/meta-diagram';
import { ExtraObject, MechanismToVariant, MetaNodeToOptions } from '../utils';
import { extractParams } from './utils';
import ModelSingleton from "../../ModelSingleton";
import QueryService from "../../../services/queryService";

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    ports: { [key: string]: Array<any> };
    extra: ExtraObject;
    innerClass: any;
    parent: CompositionNode|undefined;
    metaParent: MetaNode|undefined;

    constructor(
        name: string,
        type: string,
        parent: CompositionNode|undefined,
        ports?: { [key: string]: Array<any> },
        extra?: ExtraObject | undefined)
    {
        this.name = name;
        this.parent = parent;
        this.innerClass = type;
        this.metaParent = parent?.getMetaNode();
        this.extra = extra !== undefined ? extra : {};
        // TODO: there is a disalignment between the MechanismNode and the MetaNode since the ports passed here are
        // not used to instantiate the MetaNode because we get that from the summary for serialised nodes and from the
        // class defaults for the new nodes. This will require a refactory / clean up to sort this out.
        this.ports = ports !== undefined ? ports : {};
    }

    getName() : string {
        return this.name;
    }

    setIcon(path: string) {
        this.extra.icon = path !== undefined ? path : this.extra.icon;
    }

    getIcon() : string{
        return this?.extra?.icon || '';
    }

    setExpanded(expandedState: Boolean) {
        this.extra.isExpanded = expandedState !== undefined ? expandedState : !this.extra.isExpanded;
    }

    getExpanded() : Boolean {
        return this?.extra?.isExpanded || false;
    }

    addPort(singlePort: any) {
        console.log('addPort to be implemented');
    }

    deletePort(portId: string) {
        console.log('deletePort to be implemented');
    }

    getPorts() : { [key: string]: any } {
        return this.ports;
    }

    setParent(newParent: CompositionNode) {
        if (this.parent) {
            this.parent?.removeChild(this);
        }
        this.parent = newParent;
        this.metaParent = newParent?.getMetaNode();
        this.parent?.addChild(this);
    }

    getParent(): CompositionNode|undefined {
        return this.parent;
    }

    getPosition(): Point {
        if (this.extra?.position === undefined) {
            this.extra.position = {
                x: 0,
                y: 0
            }
        }
        return new Point(
            this.extra.position?.x,
            this.extra.position?.y
        );
    }

    setPosition(x:number, y:number) {
        if (this.extra?.position === undefined) {
            this.extra.position = {
                x: 0,
                y: 0
            }
        }
        this.extra.position.x = x;
        this.extra.position.y = y;
    }

    getType() : string {
        return this.innerClass;
    }

    getVariantFromType() : string {
        if (MechanismToVariant.hasOwnProperty(this.innerClass)) {
            return MechanismToVariant[this.innerClass];
        }
        return 'node-gray';
    }

    getOptionsFromType(summaries: any, defaults: any): Map<string, any> {
        // Ensure MetaNodeToOptions[this.innerClass] is defined before proceeding
        let classParams = MetaNodeToOptions[this.innerClass] ?
            JSON.parse(JSON.stringify(MetaNodeToOptions[this.innerClass])) :
            {}; // Use an empty object if it's undefined

        if (summaries !== undefined && summaries?.hasOwnProperty(this.name)) {
            const summary = summaries[this.name];
            classParams = extractParams(summary[this.name], classParams, true);
        } else {
            classParams = extractParams(defaults, classParams, false);
        }

        let nodeOptions = {
            name: this.name,
            variant: 'node-gray',
            pnlClass: this.getType(),
            shape: this.getType(),
            selected: false,
            height: this.extra?.height !== undefined ? this.extra?.height : (this.innerClass === PNLClasses.COMPOSITION ? 300 : 100),
            width: this.extra?.width !== undefined ? this.extra?.width : (this.innerClass === PNLClasses.COMPOSITION ? 150 : 100),
            [PNLLoggables]: this.extra?.[PNLLoggables] !== undefined ? this.extra?.[PNLLoggables] : {}
        };
    
        if (MechanismToVariant?.hasOwnProperty(this.innerClass)) {
            nodeOptions = {...nodeOptions, ...classParams};
        }
    
        return new Map(Object.entries(nodeOptions));
    }
    

    extractPorts(summaries: any, defaults: any): Array<MetaPort> {
        let ports: Array<MetaPort> = [];
        let summary_inputs: any = {};
        let summary_outputs: any = {};
        if (summaries !== undefined && summaries?.hasOwnProperty(this.name)) {
            summary_inputs = summaries[this.name]?.[this.name]?.['input_ports'];
            summary_outputs = summaries[this.name]?.[this.name]?.['output_ports'];
            for (const inputPort in summary_inputs) {
                const metadata = summary_inputs[inputPort].metadata ? new Map(Object.entries(summary_inputs[inputPort].metadata)) : new Map();
                ports.push(new MetaPort(
                    inputPort,
                    inputPort,
                    PortTypes.INPUT_PORT,
                    new Point(0, 0),
                    metadata
                ));
            }
            for (const outputPort in summary_outputs) {
                const metadata = summary_outputs[outputPort].metadata ? new Map(Object.entries(summary_outputs[outputPort].metadata)) : new Map();
                ports.push(new MetaPort(
                    outputPort,
                    outputPort,
                    PortTypes.OUTPUT_PORT,
                    new Point(0, 0),
                    metadata
                ));
            }
        } else {
            const default_ports = QueryService.getPortsNewNode(this.name, this.innerClass);
            default_ports[PortTypes.INPUT_PORT].forEach((inputPort: any) => {
                ports.push(new MetaPort(
                    inputPort,
                    inputPort,
                    PortTypes.INPUT_PORT,
                    new Point(0, 0),
                    new Map()
                ));
            });
            default_ports[PortTypes.OUTPUT_PORT].forEach((outputPort: any) => {
                ports.push(new MetaPort(
                    outputPort,
                    outputPort,
                    PortTypes.OUTPUT_PORT,
                    new Point(0, 0),
                    new Map()
                ));
            });
        }
        return ports;
    }    

    getMetaNode() : MetaNode {
        const summaries = ModelSingleton.getSummaries();
        const defaults = JSON.parse(JSON.stringify(pnlStore.getState().general[PNLDefaults][this.innerClass] ?? {}));
        const ports: Array<MetaPort> = this.extractPorts(summaries, defaults);
        return new MetaNode(
            this.name,
            this.name,
            this.getType(),
            this.getPosition(),
            this.getVariantFromType(),
            this.metaParent,
            ports,
            undefined,
            this.getOptionsFromType(summaries, defaults)
        );
    }
}
