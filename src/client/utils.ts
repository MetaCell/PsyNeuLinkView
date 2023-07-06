import {MetaNodeModel} from "@metacell/meta-diagram";

export function getHTMLElementFromMetaNodeModel(node: MetaNodeModel) {
    return document.querySelector(`[data-nodeid='${node.getID()}']`) as HTMLElement;
}