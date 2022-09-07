import { PNLClasses } from '../../../constants';
import ModelInterpreter from '../../Interpreter';
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
import { MetaNode, MetaPort, Position, PortTypes } from '@metacell/meta-diagram';

export default class CompositionNode extends MechanismNode {
    children: {[key: string]: any};
    childrenMap: Map<String, MechanismNode|CompositionNode|ProjectionLink>;
    innerClass: String;
    parent: MechanismNode|CompositionNode|undefined;

    constructor(
        name: string,
        parent: MechanismNode|CompositionNode|undefined,
        icon?: string,
        isExpaded?: boolean,
        ports?: { [key: string]: Array<any> },
        extra?: Object,
        children?: {[key: string]: any})
    {
        super(name, parent, icon, isExpaded, ports, extra);

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

        // const castChild = ModelInterpreter.castObject(child, this.parent);
        // this.childrenMap.set(child.id, castChild);

        // switch(castChild.getType()) {
        //     case PNLClasses.COMPOSITION:
        //         this.children[PNLClasses.COMPOSITION].push(castChild);
        //         break;
        //     case PNLClasses.MECHANISM:
        //         this.children[PNLClasses.MECHANISM].push(castChild);
        //         break;
        //     case PNLClasses.PROJECTION:
        //         this.children[PNLClasses.PROJECTION].push(castChild);
        //         break;
        // }
    }

    getChildren() : {[key: string]: any} {
        return this.children;
    }

    getType(): String {
        return this.innerClass;
    }

    getMetaNode() : any {
        // TODO: get position from the graphviz data
        let x = 200 + Math.random() * 600;
        let y = 200 + Math.random() * 600;
        let parent = this.parent ? this.parent.getMetaNode() : undefined;
        let ports: Array<MetaPort> = []
        return new MetaNode(
            this.name,
            this.name,
            PNLClasses.COMPOSITION,
            new Position(x, y),
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
}