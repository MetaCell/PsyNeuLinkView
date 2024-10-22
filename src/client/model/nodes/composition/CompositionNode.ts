import { ExtraObject } from '../utils';
import {Point} from "@projectstorm/geometry";
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
import { MetaNode, MetaPort } from '@metacell/meta-diagram';
import { PNLClasses, PNLMechanisms, PNLLoggables } from '../../../../constants';

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
        super(name, PNLClasses.COMPOSITION, parent, ports, extra);

        this.childrenMap = new Map();
        this.children = {};
        if (children) {
            this.children = children;
        } else {
            Object.values(PNLClasses).forEach((key) => {
                this.children[key] = [];
            });
            Object.values(PNLMechanisms).forEach((key) => {
                this.children[key] = [];
            });
        }

        this.metaChildren = [];
        if (children) {
            children[PNLClasses.COMPOSITION].forEach((child: any) => {
                if (this.childrenMap.has(child.getName())) {
                    throw Error('ChildrenMap already has an object with that name.');
                }
                this.childrenMap.set(child.getName(), child);
                this.metaChildren.push(child.getMetaNode());
            });
            Object.keys(PNLMechanisms).forEach((key) => {
                children[key].forEach((child: any) => {
                    if (this.childrenMap.has(child.getName())) {
                        throw Error('ChildrenMap already has an object with that name.');
                    }
                    this.childrenMap.set(child.getName(), child);
                    this.metaChildren.push(child.getMetaNode());
                });
            });
        }

        if (this.extra?.boundingBox) {
            this.extra.position = {
                x: this.extra.boundingBox.llx,
                y: this.extra.boundingBox.lly
            }
        }

        this.innerClass = PNLClasses.COMPOSITION;
    }

    addChild(child: MechanismNode|CompositionNode) {
        if (!this.childrenMap.has(child.getName())) {
            this.childrenMap?.set(child.getName(), child);
            this.metaChildren?.push(child.getMetaNode());
        }
        this.children[child.getType()]?.push(child);
    }

    removeChild(child: MechanismNode|CompositionNode) {
        if (this.childrenMap.has(child.getName())) {
            this.childrenMap.delete(child.getName());
            this.metaChildren = this.metaChildren?.filter((item: MetaNode) => item.getId() !== child.getName());
        }

        this.children[child.getType()] = this.children[child.getType()]?.filter( (item: any) => {
            return item.getName() !== child.getName()
        });
    }

    getChildren() : {[key: string]: any} {
        return this.children;
    }

    getType(): string {
        return this.innerClass;
    }

    getPosition(): Point {
        if (this.extra?.position === undefined) {
            this.setPosition(Math.random() * 900, Math.random() * 900);
        }

        return new Point(
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
                learning_rate: '',
                learn_field_weights : '',
                enable_learning : '',
                device : '',
                field_weights: '',
                field_names : [],
                softmax_gain : '',
                seed : '',
                memory_capacity : '',
                memory_fill : '',
                memory_decay_rate : '',
                softmax_threshold : '',
                normalize_field_weights : '',
                concatenate_keys : '',
                variant: 'node-gray',
                pnlClass: PNLClasses.COMPOSITION,
                shape: PNLClasses.COMPOSITION,
                selected: false,
                width: width,
                height: height,
                [PNLLoggables]: this.extra?.[PNLLoggables] !== undefined ? this.extra?.[PNLLoggables] : {}
            })
        )
        );
    }
}
