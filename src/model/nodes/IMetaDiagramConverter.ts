import { MetaNode } from 'meta-diagram';

export default interface IMetaDiagramConverter {
    getMetaNode(): MetaNode;
}