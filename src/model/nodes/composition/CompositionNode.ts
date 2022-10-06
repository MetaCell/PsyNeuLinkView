import { PNLClasses } from '../../../constants';
import ModelInterpreter from '../../Interpreter';
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
import { MetaNode, MetaPort, Position, PortTypes } from '@metacell/meta-diagram';

export default class CompositionNode extends MechanismNode {
    children: {[key: string]: any};
    childrenMap: Map<string, MechanismNode|CompositionNode|ProjectionLink>;
    innerClass: string;
    boundingBox: {[key: string]: Number}|undefined;

    constructor(
        name: string,
        parent: CompositionNode|undefined,
        icon?: string,
        isExpaded?: boolean,
        ports?: { [key: string]: Array<any> },
        extra?: Object,
        children?: {[key: string]: any},
        boundingBox?: {[key: string]: Number}|undefined)
    {
        super(name, parent, icon, isExpaded, ports, extra);

        this.childrenMap = new Map();
        this.children = children !== undefined ? children : {
            [PNLClasses.MECHANISM]: [],
            [PNLClasses.PROJECTION]: [],
            [PNLClasses.COMPOSITION]: [],
        };
        this.innerClass = PNLClasses.COMPOSITION;
        this.boundingBox = boundingBox;
    }

    addChild(child: MechanismNode|CompositionNode|ProjectionLink) {
        if (!this.childrenMap.has(child.getName())) {
            this.childrenMap.set(child.getName(), child);
        }
        this.children[child.getType()].push(child);
    }

    removeChild(child: MechanismNode|CompositionNode|ProjectionLink) {
        if (this.childrenMap.has(child.getName())) {
            this.childrenMap.delete(child.getName());
        }
        switch (child.getType()) {
            case PNLClasses.MECHANISM: {
                this.children[PNLClasses.MECHANISM] = this.children[PNLClasses.MECHANISM].filter( (item: MechanismNode) => {
                    return item.getName() !== child.getName()
                })
                break;
            }
            case PNLClasses.COMPOSITION: {
                this.children[PNLClasses.COMPOSITION] = this.children[PNLClasses.COMPOSITION].filter( (item: MechanismNode) => {
                    return item.getName() !== child.getName()
                })
                break;
            }
            case PNLClasses.PROJECTION: {
                this.children[PNLClasses.PROJECTION] = this.children[PNLClasses.PROJECTION].filter( (item: MechanismNode) => {
                    return item.getName() !== child.getName()
                })
                break;
            }
        }
    }

    getChildren() : {[key: string]: any} {
        return this.children;
    }

    getType(): string {
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
