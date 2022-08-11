// import MetaDiagram from 'meta-diagram';
import Port from '../PortNode';
import PortNode from '../PortNode';
import { PNLClasses } from '../../../constants';
import ModelInterpreter from '../../Interpreter';
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
// import { castObject } from '../../utils';


export default class CompositionNode extends MechanismNode {
    children: {[key: string]: any};
    childrenMap: Map<String, MechanismNode|CompositionNode|ProjectionLink>;
    innerClass: String;

    constructor(name: string, icon?: string, isExpaded?: boolean, ports?: Array<PortNode>, extra?: Object, children?: {[key: string]: any}) {
        super(name, icon, isExpaded, ports, extra);

        this.childrenMap = new Map();
        this.children = children !== undefined ? children : {
            'mechanisms': [],
            'projections': [],
            'compositions': [],
        };
        this.innerClass = PNLClasses.COMPOSITION;
    }

    addChild(child: any) {
        if (child?.id === undefined) {
            throw new TypeError('Each child should have a unique id string.');
        }

        if (this.childrenMap.has(child.id)) {
            return;
        }

        const castChild = ModelInterpreter.castObject(child);
        this.childrenMap.set(child.id, castChild);

        switch(castChild.getType()) {
            case PNLClasses.COMPOSITION:
                this.children[PNLClasses.COMPOSITION].push(castChild);
                break;
            case PNLClasses.MECHANISM:
                this.children[PNLClasses.MECHANISM].push(castChild);
                break;
            case PNLClasses.PROJECTION:
                this.children[PNLClasses.PROJECTION].push(castChild);
                break;
        }
    }

    getChildren() : {[key: string]: any} {
        return this.children;
    }

    getType(): String {
        return this.innerClass;
    }

    getMetaDiagram() : any {
        console.log("Composition Node implementation of getMetaDiagram.");
    }
}