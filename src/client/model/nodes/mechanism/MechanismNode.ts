import {Point} from "@projectstorm/geometry";
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import CompositionNode from '../composition/CompositionNode';
import { MetaNode, MetaPort, PortTypes } from '@metacell/meta-diagram';
import { ExtraObject, MechanismToVariant, MetaNodeToOptions } from '../utils';

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    ports: { [key: string]: Array<any> };
    extra: ExtraObject;
    // TODO: change this back to string
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
            this.parent.removeChild(this);
        }
        this.parent = newParent;
        this.metaParent = newParent.getMetaNode();
        this.parent.addChild(this);
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

    getOptionsFromType() : Map<string, any> {
        let nodeOptions = {
            name: this.name,
            variant: 'node-gray',
            pnlClass: this.getType(),
            shape: this.getType(),
            selected: false,
            height: this.extra?.height !== undefined ? this.extra?.height : 100,
            width: this.extra?.width !== undefined ? this.extra?.width : 100,
        };

        if (MechanismToVariant.hasOwnProperty(this.innerClass)) {
            nodeOptions = {...nodeOptions, ...MetaNodeToOptions[this.innerClass]};
        }
        return new Map(Object.entries(nodeOptions));
    }

    getMetaNode() : MetaNode {
        let ports: Array<MetaPort> = []
        // TODO: the MetaPort has the enum prefix cause the projections are created with that prefix
        // to bring this to the attention of John or otherwise improve this in this codebase
        this.ports[PortTypes.INPUT_PORT].forEach((port: any) => ports.push(new MetaPort(
            PortTypes.INPUT_PORT + '-' + port,
            PortTypes.INPUT_PORT + '-' + port,
            PortTypes.INPUT_PORT,
            new Point(0, 0),
            new Map()))
        );
        this.ports[PortTypes.OUTPUT_PORT].forEach((port: any) => ports.push(new MetaPort(
            PortTypes.OUTPUT_PORT + '-' + port,
            PortTypes.OUTPUT_PORT + '-' + port,
            PortTypes.OUTPUT_PORT,
            new Point(0, 0),
            new Map()))
        );
        this.ports[PortTypes.PARAMETER_PORT].forEach((port: any) => ports.push(new MetaPort(
            PortTypes.PARAMETER_PORT + '-' + port,
            PortTypes.PARAMETER_PORT + '-' + port,
            PortTypes.PARAMETER_PORT,
            new Point(0, 0),
            new Map()))
        );
        return new MetaNode(
            this.name,
            this.name,
            this.getType(),
            this.getPosition(),
            this.getVariantFromType(),
            this.metaParent,
            ports,
            undefined,
            this.getOptionsFromType()
        );
    }
}
