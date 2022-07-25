import PortNode from '../PortNode';
import { MetaNode, Position } from 'meta-diagram';
import IMetaDiagramConverter from '../IMetaDiagramConverter';
import { colorGreen } from '../../../assets/styles/constant';
import MechIcon from '../../../assets/svg/mechanismgreen.svg';

export default class MechanismNode implements IMetaDiagramConverter {
    name: string;
    icon: string;
    isExpanded: Boolean;
    ports: Array<PortNode>;
    extra: Object;

    constructor(name: string, icon?: string, isExpaded?: boolean, ports?: Array<PortNode>, extra?: Object) {
        this.name = name;
        this.icon = icon !== undefined ? icon : "";
        this.ports = ports !== undefined ? ports : [];
        this.extra = extra !== undefined ? extra : [];
        this.isExpanded = isExpaded !== undefined ? isExpaded : false;
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
        this.ports = this.ports.filter(port => port.id !== portId);
    }

    getPorts() : Array<PortNode> {
        return this.ports;
    }

    getMetaNode() : MetaNode {
        // TODO: get position from the graphviz data
        let x = 200 + Math.random() * 600;
        let y = 200 + Math.random() * 600;
        return new MetaNode(
            this.name,
            this.name,
            'mechanism',
            new Position(x, y),
                new Map(Object.entries({
                    name: 'Mechanism Name',
                    variant: colorGreen,
                    icon: MechIcon,
                    pnlClass: 'ProcessingMechanism',
                    shape: 'circle',
                    selected: false
                })
            )
        );
    }
}