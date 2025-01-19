import { ExtraObject } from '../utils';
import {Point} from "@projectstorm/geometry";
import MechanismNode from '../mechanism/MechanismNode';
import ProjectionLink from '../../links/ProjectionLink';
import { MetaNode, MetaPort } from '@metacell/meta-diagram';
import { PNLClasses, PNLMechanisms, PNLDefaults } from '../../../../constants';
import ModelSingleton from '../../ModelSingleton';
import pnlStore from '../../../redux/store';

export default class CompositionNode extends MechanismNode {
    children: {[key: string]: any};
    metaChildren: Array<MetaNode>;
    childrenMap: Map<string, MechanismNode|CompositionNode|ProjectionLink>;

    constructor(
        name: string,
        type: string,
        parent: CompositionNode|undefined,
        ports?: { [key: string]: Array<any> },
        extra?: ExtraObject,
        children?: {[key: string]: any})
    {
        super(name, type, parent, ports, extra);

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
            this.childrenMap?.delete(child.getName());
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
        const summaries = ModelSingleton.getSummaries();
        const defaults = JSON.parse(JSON.stringify(pnlStore.getState().general[PNLDefaults][this.innerClass] ?? {}));
        const ports: Array<MetaPort> = []
        return new MetaNode(
            this.name,
            this.name,
            this.getType(),
            this.getPosition(),
            this.getVariantFromType(),
            this.metaParent,
            ports,
            undefined,
            this.getOptionsFromType(summaries, defaults)
        );
    }
}
