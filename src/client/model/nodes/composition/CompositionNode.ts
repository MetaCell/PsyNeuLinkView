import { PNLClasses } from '../../../../constants';
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
import { MetaNode, MetaPort, Position } from '@metacell/meta-diagram';
import { ExtraObject } from '../utils';

export default class CompositionNode extends MechanismNode {
    children: {[key: string]: any};
    metaChildren: Array<MetaNode>;
    childrenMap: Map<string, MechanismNode|CompositionNode|ProjectionLink>;

    constructor(
        name: string,
        parent: CompositionNode|undefined,
        ports?: { [key: string]: Array<any> },
        extra?: ExtraObject,
        children?: {[key: string]: any})
    {
        super(name, parent, ports, extra);

        this.childrenMap = new Map();
        this.children = children !== undefined ? children : {
            [PNLClasses.MECHANISM]: [],
            [PNLClasses.PROJECTION]: [],
            [PNLClasses.COMPOSITION]: [],
        };

        this.metaChildren = [];
        if (children) {
            children[PNLClasses.COMPOSITION].forEach((child: any) => {
                if (this.childrenMap.has(child.getName())) {
                    throw Error('ChildrenMap already has an object with that name.');
                }
                this.childrenMap.set(child.getName(), child);
                this.metaChildren.push(child.getMetaNode());
            });
            children[PNLClasses.MECHANISM].forEach((child: any) => {
                if (this.childrenMap.has(child.getName())) {
                    throw Error('ChildrenMap already has an object with that name.');
                }
                this.childrenMap.set(child.getName(), child);
                this.metaChildren.push(child.getMetaNode());
            });
        }

        if (this.extra?.boundingBox) {
            console.log(this.extra.boundingBox);
            this.extra.position = {
                x: this.extra.boundingBox.llx,
                y: this.extra.boundingBox.lly
            }
        }

        this.innerClass = PNLClasses.COMPOSITION;
    }

    addChild(child: MechanismNode|CompositionNode) {
        if (!this.childrenMap.has(child.getName())) {
            this.childrenMap.set(child.getName(), child);
            this.metaChildren.push(child.getMetaNode());
        }
        this.children[child.getType()].push(child);
    }

    removeChild(child: MechanismNode|CompositionNode) {
        if (this.childrenMap.has(child.getName())) {
            this.childrenMap.delete(child.getName());
            this.metaChildren = this.metaChildren.filter((item: MetaNode) => item.getId() !== child.getName());
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

    getPosition(): Position {
        if (this.extra?.position === undefined) {
            this.setPosition(Math.random() * 900, Math.random() * 900);
        }

        return new Position(
            // @ts-ignore
            this.extra.position.x, this.extra.position.y
        );
    }

    getMetaNode() : any {
        // TODO: get position from the graphviz data
        // @ts-ignore
        const width = Math.abs(parseFloat(this.extra.boundingBox['llx']) - parseFloat(this.extra.boundingBox['urx']));
        // @ts-ignore
        const height = Math.abs(parseFloat(this.extra.boundingBox['ury']) - parseFloat(this.extra.boundingBox['lly']));
        let ports: Array<MetaPort> = []
        return new MetaNode(
            this.name,
            this.name,
            PNLClasses.COMPOSITION,
            this.getPosition(),
            'node-gray',
            this.metaParent,
            ports,
            this.metaChildren,
            new Map(Object.entries({
                name: this.name,
                variant: 'node-gray',
                pnlClass: PNLClasses.COMPOSITION,
                shape: PNLClasses.COMPOSITION,
                selected: false,
                width: width,
                height: height,
            })
        )
        );
    }
}
