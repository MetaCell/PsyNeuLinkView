import { PNLClasses } from '../../../constants';
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import CompositionNode from '../composition/CompositionNode';
import { MetaNode, MetaPort, Position, PortTypes } from '@metacell/meta-diagram';

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    icon: string;
    isExpanded: Boolean;
    ports: { [key: string]: Array<any> };
    extra: Object;
    innerClass: string;
    parent: CompositionNode|undefined;
    xPosition: number;
    yPosition: number;

    constructor(
        name: string,
        parent: CompositionNode|undefined,
        icon?: string,
        isExpaded?: boolean,
        ports?: { [key: string]: Array<any> },
        extra?: Object,
        xPosition?: number,
        yPosition?: number)
    {
        this.name = name;
        this.icon = icon !== undefined ? icon : "";
        this.ports = ports !== undefined ? ports : {};
        this.extra = extra !== undefined ? extra : [];
        this.isExpanded = isExpaded !== undefined ? isExpaded : false;
        this.innerClass = PNLClasses.MECHANISM;
        this.parent = parent;
        this.xPosition = xPosition || Math.random() * 900;
        this.yPosition = yPosition || Math.random() * 900;
    }

    getName() : string {
        return this.name;
    }

    setIcon(path: string) {
        this.icon = path !== undefined ? path : this.icon;
    }


    getIcon() : string{
        return this.icon;
    }

    setExpanded(expandedState: Boolean) {
        this.isExpanded = expandedState !== undefined ? expandedState : !this.isExpanded;
    }

    getExpanded() : Boolean {
        return this.isExpanded;
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

    setParent(newParent : CompositionNode) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = newParent;
        this.parent.addChild(this);
    }

    getParent() : MechanismNode|CompositionNode|undefined {
        return this.parent;
    }

    getMetaNode() : MetaNode {
        let parent = this.parent ? this.parent.getMetaNode() : undefined;
        let ports: Array<MetaPort> = []
        // TODO: the MetaPort has the enum prefix cause the projections are created with that prefix
        // from the graphviz data we get.
        this.ports[PortTypes.INPUT_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.INPUT_PORT + '-' + port, PortTypes.INPUT_PORT + '-' + port, PortTypes.INPUT_PORT, new Position(0, 0), new Map())));
        this.ports[PortTypes.OUTPUT_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.OUTPUT_PORT + '-' + port, PortTypes.OUTPUT_PORT + '-' + port, PortTypes.OUTPUT_PORT, new Position(0, 0), new Map())));
        this.ports[PortTypes.PARAMETER_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.PARAMETER_PORT + '-' + port, PortTypes.PARAMETER_PORT + '-' + port, PortTypes.PARAMETER_PORT, new Position(0, 0), new Map())));
        // this.ports[PortTypes.INPUT_PORT].forEach((port: any) => ports.push(new MetaPort(port, port, PortTypes.INPUT_PORT, new Position(0, 0), new Map())));
        // this.ports[PortTypes.OUTPUT_PORT].forEach((port: any) => ports.push(new MetaPort(port, port, PortTypes.OUTPUT_PORT, new Position(0, 0), new Map())));
        // this.ports[PortTypes.PARAMETER_PORT].forEach((port: any) => ports.push(new MetaPort(port, port, PortTypes.PARAMETER_PORT, new Position(0, 0), new Map())));
        return new MetaNode(
            this.name,
            this.name,
            PNLClasses.MECHANISM,
            new Position(this.xPosition, this.yPosition),
            'node-gray',
            parent,
            ports,
            new Map(Object.entries({
                name: 'Mechanism Name',
                variant: 'node-gray',
                pnlClass: 'ProcessingMechanism',
                shape: 'circle',
                selected: false
            })
        )
        );
    }

    getType() : string {
        return this.innerClass;
    }
}
