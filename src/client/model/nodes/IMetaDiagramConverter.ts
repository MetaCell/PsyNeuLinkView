import { MetaNode } from '@metacell/meta-diagram';

export default interface IMetaDiagramConverter {
    getMetaNode(): MetaNode;
}