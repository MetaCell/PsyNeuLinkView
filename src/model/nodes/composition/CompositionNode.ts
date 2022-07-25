// import MetaDiagram from 'meta-diagram';
import Port from '../PortNode';
import PortNode from '../PortNode';
import MechanismNode from '../mechanism/MechanismNode';
import { castObject } from '../../utils';


export default class CompositionNode extends MechanismNode {
    children: Array<MechanismNode|CompositionNode>;
    childrenMap: Map<String, MechanismNode|CompositionNode>;

    constructor(name: string, icon?: string, isExpaded?: boolean, ports?: Array<PortNode>, extra?: Object, children?: Array<MechanismNode|CompositionNode>) {
        super(name, icon, isExpaded, ports, extra);

        this.childrenMap = new Map();
        this.children = children !== undefined ? children : [];
    }

    addChild(child: any) {
        if (child?.id === undefined) {
            throw new TypeError('Each child should have a unique id string.');
        }

        if (this.childrenMap.has(child.id)) {
            return;
        }

        const castChild = castObject(child);
        this.childrenMap.set(child.id, castChild);
        this.children.push(castChild);
    }

    getChildren() : Array<MechanismNode|CompositionNode> {
        return this.children;
    }

    getMetaDiagram() : any {
        console.log("Composition Node implementation of getMetaDiagram.");
    }
}