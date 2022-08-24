import PortNode from '../PortNode';
import { MetaNode, MetaPort, Position, PortTypes } from '@metacell/meta-diagram';
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import { PNLClasses } from '../../../constants';

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    icon: string;
    isExpanded: Boolean;
    ports: { [key: string]: any }
    extra: Object;
    innerClass: String;

    constructor(name: string, icon?: string, isExpaded?: boolean, ports?: { [key: string]: any }, extra?: Object) {
        this.name = name;
        this.icon = icon !== undefined ? icon : "";
        this.ports = ports !== undefined ? ports : {};
        this.extra = extra !== undefined ? extra : [];
        this.isExpanded = isExpaded !== undefined ? isExpaded : false;
        this.innerClass = PNLClasses.MECHANISM;
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
        this.ports.push(new PortNode(singlePort.id, singlePort.name, singlePort.role));
    }

    deletePort(portId: string) {
        this.ports = this.ports.filter((port:any) => port.id !== portId);
    }

    getPorts() : { [key: string]: any } {
        return this.ports;
    }

    getMetaNode() : MetaNode {
        // TODO: get position from the graphviz data
        let x = 200 + Math.random() * 600;
        let y = 200 + Math.random() * 600;
        let ports = new Map();
        this.ports[PortTypes.INPUT_PORT].forEach((port: string) => ports.set(port, new MetaPort(port, port, PortTypes.INPUT_PORT, new Position(0, 0), new Map())));
        this.ports[PortTypes.OUTPUT_PORT].forEach((port: string) => ports.set(port, new MetaPort(port, port, PortTypes.OUTPUT_PORT, new Position(0, 0), new Map())));
        this.ports[PortTypes.PARAMETER_PORT].forEach((port: string) => ports.set(port, new MetaPort(port, port, PortTypes.PARAMETER_PORT, new Position(0, 0), new Map())));
        return new MetaNode(
            this.name,
            this.name,
            'mechanism',
            new Position(x, y),
            'node-gray',
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

    getType() : String {
        return this.innerClass;
    }
}