import { PNLClasses } from '../../../constants';
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import { MetaNode, MetaPort, Position, PortTypes } from '@metacell/meta-diagram';

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    icon: string;
    isExpanded: Boolean;
    ports: { [key: string]: Array<any> } ;
    extra: Object;
    innerClass: String;

    constructor(name: string, icon?: string, isExpaded?: boolean, ports?: { [key: string]: Array<any> }, extra?: Object) {
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
        console.log('addPort to be implemented');
    }

    deletePort(portId: string) {
        console.log('deletePort to be implemented');
    }

    getPorts() : { [key: string]: any } {
        return this.ports;
    }

    getMetaNode() : MetaNode {
        // TODO: get position from the graphviz data
        let x = 200 + Math.random() * 600;
        let y = 200 + Math.random() * 600;
        let ports: Array<MetaPort> = []
        // TODO: the MetaPort has the enum prefix cause the projections are created with that prefix
        // from the graphviz data we get.
        this.ports[PortTypes.INPUT_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.INPUT_PORT + '-' + port, PortTypes.INPUT_PORT + '-' + port, PortTypes.INPUT_PORT, new Position(0, 0), new Map())));
        this.ports[PortTypes.OUTPUT_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.OUTPUT_PORT + '-' + port, PortTypes.OUTPUT_PORT + '-' + port, PortTypes.OUTPUT_PORT, new Position(0, 0), new Map())));
        // this.ports[PortTypes.PARAMETER_PORT].forEach((port: any) => ports.push(new MetaPort(PortTypes.PARAMETER_PORT + '-' + port, PortTypes.PARAMETER_PORT + '-' + port, PortTypes.PARAMETER_PORT, new Position(0, 0), new Map())));
        return new MetaNode(
            this.name,
            this.name,
            'mechanism',
            new Position(x, y),
            'node-blue',
            ports,
            new Map(Object.entries({
                name: 'Mechanism Name',
                variant: 'node-blue',
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