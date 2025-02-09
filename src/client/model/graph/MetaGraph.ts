import {PNLClasses, RESIZE_CHANGED_POS_OPTION} from "../../../constants";
import {MetaLink, MetaNodeModel, MetaLinkModel} from "@metacell/meta-diagram"
import {Point} from "@projectstorm/geometry";
import {MetaGraphEventTypes} from "./eventsHandler";
import {arePathsDifferent, getNewPath} from "./utils";
import {getClippingHelper} from "../clipping/ClippingHelperFactory";

/**
 * Represents a tree node with a MetaNodeModel and its children Graph nodes.
 */
export class Graph {
    private readonly node: MetaNodeModel;
    private readonly children: Map<string, Graph>;

    /**
     * Creates a Graph instance.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel instance to create the Graph node with.
     */
    constructor(metaNodeModel: MetaNodeModel) {
        this.node = metaNodeModel;
        this.children = new Map<string, Graph>()
    }

    /**
     * Returns the ID of the MetaNodeModel.
     * @returns {string} - The ID of the MetaNodeModel.
     */
    getID(): string {
        return this.node.getID()
    }

    /**
     * Returns the MetaNodeModel.
     * @returns {MetaNodeModel} - The MetaNodeModel.
     */
    getNode(): MetaNodeModel {
        return this.node
    }

    /**
     * Returns the child Graph node with the given ID.
     * @param {string} id - The ID of the child Graph node.
     * @returns {Graph | undefined} - The child Graph node if found, undefined otherwise.
     */
    getChild(id: string) {
        return this.children.get(id)
    }

    /**
     * Adds a child Graph node.
     * @param {Graph} graph - The child Graph node to add.
     */
    addChild(graph: Graph): void {
        this.children.set(graph.getID(), graph)
    }

    /**
     * Deletes a child Graph node with the given ID.
     * @param {string} id - The ID of the child Graph node to delete.
     */
    deleteChild(id: string): void {
        this.children.delete(id);
    }

    /**
     * Returns an array of MetaNodeModel instances representing children of the Graph node.
     * @returns {MetaNodeModel[]} - An array of MetaNodeModel instances.
     */
    getChildren(): MetaNodeModel[] {
        return Array.from(this.children.values()).map(g => g.getNode())
    }

    /**
     * Returns the child Graph nodes as a Map.
     * @returns {Map<string, Graph>} - The child Graph nodes.
     */
    getChildrenGraphs(): Map<string, Graph> {
        return this.children;
    }

    /**
     * Returns an array of MetaNodeModel instances representing the descendancy of the Graph node.
     * @returns {MetaNodeModel[]} - An array of MetaNodeModel instances.
     */
    getDescendancy(): MetaNodeModel[] {
        const descendancy = this.getChildren()
        for (const graph of Array.from(this.children.values())) {
            descendancy.push(...graph.getDescendancy())
        }
        return descendancy
    }

    /**
     * Filters the given links array and returns a new array containing only links connected to the given nodes.
     * @param {MetaNodeModel[]} nodes - The nodes to filter the links by.
     * @param {MetaLinkModel[]} links - The links to filter.
     * @returns {MetaLinkModel[]} - An array of MetaLinkModel instances.
     */

    getDescendancyLinks(nodes: MetaNodeModel[], links: MetaLinkModel[]): MetaLinkModel[] {
        const nodesIds = nodes.map(n => n.getID());
        return links?.filter(l => nodesIds.includes(l.getSourcePort().getNode().getID()) && nodesIds.includes(l.getTargetPort().getNode().getID()));
    }

    /**
     * Depth-First Search for a MetaNodeModel with the given ID.
     * @param {string} id - The ID of the MetaNodeModel to search for.
     * @returns {MetaNodeModel | boolean} - The MetaNodeModel instance if found, false otherwise.
     */
    dfs(id: string): MetaNodeModel | boolean {
        if (this.getID() === id) {
            return this.node
        }
        for (let node of Array.from(this.children.values())) {
            const found = node.dfs(id)
            if (found) {
                return found
            }
        }
        return false
    }

    updateDescendantsPath(newBasePath: string[]) {
        this.children.forEach((childGraph) => {
            const childNode = childGraph.getNode();
            const newChildPath = [...newBasePath, childNode.getID()];

            childNode.setOption('graphPath', newChildPath);
            childGraph.updateDescendantsPath(newChildPath);
        });
    }
}


/**
 * Represents the entire diagram graph with multiple roots and links.
 */
export class MetaGraph {
    private readonly roots: Map<string, Graph>;
    private readonly links: MetaLinkModel[];
    private parentUpdating: boolean;
    private listeners: Function[];


    /**
     * Creates a MetaGraph instance.
     */
    constructor() {
        this.roots = new Map<string, Graph>()
        this.links = [];
        this.parentUpdating = false;
        this.listeners = [];
    }

    addListener(listener: Function) {
        this.listeners.push(listener);
    }

    removeListener(listener: Function) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    // Notify all listeners when a node is added
    notify(event: any) {
        this.listeners.forEach((listener) => listener(event));
    }

    /**
     * Adds links to the MetaGraph.
     * @param {MetaLink[]} links - The links to add.
     */
    addLinks(links: MetaLink[]) {
        links.forEach((child: MetaLink) => {
            const link = child.toModel();
            const source = this.getNodeDFS(child.getSourceId());
            const target = this.getNodeDFS(child.getTargetId());
            if (source && target) {
                link.setSourcePort(source.getPort(child.getSourcePortId()));
                link.setTargetPort(target.getPort(child.getTargetPortId()));
                this.links.push(link);
            }
        });
        this.notify({type: MetaGraphEventTypes.LINK_ADDED, payload: links})
    }

    /**
     * Adds link to the MetaGraph.
     * @param {MetaLinkModel[]} link - The link to add.
     */
    addLink(link: MetaLinkModel) {
        const source = link.getSourcePort()
        const target = link.getTargetPort();
        if (source && target) {
            this.links.push(link);
        }
        this.notify({type: MetaGraphEventTypes.LINK_ADDED, payload: link})
    }

    /**
     * Returns the links of the MetaGraph.
     * @returns {MetaLinkModel[]} - An array of MetaLinkModel instances.
     */
    getLinks(): MetaLinkModel[] {
        return this.links;
    }

    /**
     * Adds a MetaNodeModel to the MetaGraph.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel to add.
     */
    addNode(metaNodeModel: MetaNodeModel): void {
        const path = metaNodeModel.getGraphPath()
        if (path.length === 1) {
            this.roots.set(metaNodeModel.getID(), new Graph(metaNodeModel))
        } else {
            path.pop() // Removes own id from path
            const parentGraph = this.getNodeGraph(path)
            parentGraph.addChild(new Graph(metaNodeModel))
        }
        this.notify({type: MetaGraphEventTypes.NODE_ADDED, payload: metaNodeModel})
    }

    /**
     * Removes a MetaNodeModel from the MetaGraph.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel to remove.
     * @param {boolean} flagUpdate - Whether to notify listeners of the removal.
     * @returns {string[]} - The path of the removed node.
     */

    removeNode(metaNodeModel: MetaNodeModel, flagUpdate:Boolean): string[] {
        const path = metaNodeModel.getGraphPath();
        if (path.length === 1) {
            this.roots.delete(metaNodeModel.getID());
        } else {
            const parentGraph = this.findParentNodeGraph(path);
            parentGraph.deleteChild(metaNodeModel.getID());
        }
        if (flagUpdate) {
            this.notify({type: MetaGraphEventTypes.NODE_REMOVED, payload: metaNodeModel});
        }
        return path;
    }

    /**
     * Removes a MetaLinkModel from the MetaGraph.
     * @param {MetaLinkModel} link - The MetaLinkModel to remove.
     * @param {boolean} flagUpdate - Whether to notify listeners of the removal.
     * @returns {void}
     */

    removeLink(link: MetaLinkModel, flagUpdate:Boolean) {
        this.links.splice(this.links.indexOf(link), 1);
        if (flagUpdate) {
            this.notify({type: MetaGraphEventTypes.LINK_REMOVED, payload: link});
        }
    }

    /**
     * Returns an array of MetaNodeModel instances representing all nodes in the MetaGraph.
     * @returns {MetaNodeModel[]} - An array of MetaNodeModel instances.
     */
    getNodes(): MetaNodeModel[] {
        const nodes = []
        for (const graph of Array.from(this.roots.values())) {
            nodes.push(graph.getNode())
            nodes.push(...graph.getDescendancy())
        }
        return nodes
    }

    /**
     * Returns a root Graph node with the given ID.
     * @param {string} rootId - The ID of the root Graph node.
     * @returns {Graph} - The root Graph node.
     * @throws {Error} If the root node is not found.
     */
    getRoot(rootId: string): Graph {
        const root = this.roots.get(rootId)
        if (root === undefined) {
            throw new Error('unknown parent ' + rootId);
        }
        return root
    }

    /**
     * Returns an array of MetaNodeModel instances representing children of the given parent node.
     * @param {MetaNodeModel} parent - The parent MetaNodeModel.
     * @returns {MetaNodeModel[]} - An array of MetaNodeModel instances representing the children.
     */
    getChildren(parent: MetaNodeModel): MetaNodeModel[] {
        const path = parent.getGraphPath()
        if (path.length === 1) {
            const root = this.getRoot(parent.getID())
            return root.getChildren()
        } else {
            const graph = this.getNodeGraph(path)
            return graph.getChildren()
        }
    }

    /**
     * Returns the parent MetaNodeModel of the given node, or undefined if the node has no parent.
     * @param {MetaNodeModel} node - The MetaNodeModel for which to find the parent.
     * @returns {MetaNodeModel | undefined} - The parent MetaNodeModel or undefined if no parent exists.
     */
    getParent(node: MetaNodeModel): MetaNodeModel | undefined {
        const path = node.getGraphPath()
        if (path.length === 1) {
            return undefined
        } else {
            const parentGraph = this.findParentNodeGraph(path)
            return parentGraph.getNode()
        }
    }

    /**
     * Returns the MetaNodeModel with the given ID using Depth-First Search, or undefined if not found.
     * @param {string} nodeId - The ID of the MetaNodeModel to search for.
     * @returns {MetaNodeModel | undefined} - The MetaNodeModel instance if found, undefined otherwise.
     */
    getNodeDFS(nodeId: string): MetaNodeModel | undefined {
        for (let root of Array.from(this.roots.values())) {
            const found = root.dfs(nodeId)
            if (found) {
                // @ts-ignore
                return found
            }
        }
        return undefined
    }

    /**
     * Returns the Graph node corresponding to the given path.
     * @param {string[]} path - The path to search for the Graph node.
     * @returns {Graph} - The Graph node corresponding to the path.
     * @throws {Error} If the Graph node is not found.
     */

    public getNodeGraph(path: string[]): Graph {
        const newPath = [...path];
        const rootId = newPath.shift()
        // @ts-ignore
        let parent = this.getRoot(rootId)
        while (newPath.length > 0) {
            const next = newPath.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent === undefined) {
                throw new Error('unknown parent ' + rootId);
            }
        }
        return parent
    }

    /**
     * Finds and returns the parent Graph node for the given path.
     * @param {string[]} path - The path to search for the parent Graph node.
     * @returns {Graph} - The parent Graph node.
     */
    private findParentNodeGraph(path: string[]): Graph {
        const newPath = [...path];
        newPath.pop();
        return this.getNodeGraph(newPath);
    }

    /**
     * Updates the graph to ensure the correct parent-children relationship.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel being updated.
     * @param {number} cursorX - The x-coordinate of the cursor.
     * @param {number} cursorY - The y-coordinate of the cursor.
     * @returns {boolean} - Returns true if the path was updated, false otherwise.
     */
    updateGraph(metaNodeModel: MetaNodeModel, cursorX: number, cursorY: number) {
        // update the graph for right parent children relationship
        let hasPathUpdated = false;
        if (!this.parentUpdating) {
            this.parentUpdating = true;
            let parentComposition: MetaNodeModel | undefined = this.getDeepestCompositionAtPoint(cursorX, cursorY, metaNodeModel);
            let newPath = getNewPath(metaNodeModel, parentComposition);
            if (arePathsDifferent(metaNodeModel, newPath)) {
                this.updateNodeInGraph(metaNodeModel, newPath);
                hasPathUpdated = true;
            }
            this.handleNodePositionChanged(metaNodeModel);
            this.parentUpdating = false;
        } else {
            this.handleNodePositionChanged(metaNodeModel);
        }
        return hasPathUpdated;
    }

    /**
     * Handles updating the node position when it changes.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel whose position changed.
     */
    handleNodePositionChanged(metaNodeModel: MetaNodeModel) {
        if (metaNodeModel.getOption(RESIZE_CHANGED_POS_OPTION)) {
            // Update children local position (children shouldn't move but rather accept the new relative position to the parent)
            this.updateChildrenLocalPosition(metaNodeModel)
        } else {
            // Update children position (children should move the same delta as node)
            this.updateChildrenPosition(metaNodeModel)

        }
        metaNodeModel.setOption(RESIZE_CHANGED_POS_OPTION, undefined, false);
        //  Update local position / relative position to the parent
        this.updateNodeLocalPosition(metaNodeModel)
    }

    /**
     * Determines the deepest composition that contains the cursor coordinates.
     * Follows a custom logic to only search on the current metaNodeModel's parent branch if it's one of the compositions
     * at point (cursorX, cursorY).
     * @param {number} cursorX - The x-coordinate of the cursor.
     * @param {number} cursorY - The y-coordinate of the cursor.
     * @param {MetaNodeModel} metaNodeModel - The node subject to graph updates
     * @returns {MetaNodeModel | undefined} - The parent node if found, undefined otherwise.
     */
    getDeepestCompositionAtPoint(cursorX: number, cursorY: number, metaNodeModel: MetaNodeModel): MetaNodeModel | undefined {
        const parent = this.getParent(metaNodeModel);
        if (parent) {
            const parentClippingHelper = getClippingHelper(parent);
            if (parentClippingHelper.getVisibleBoundingBox().containsPoint(new Point(cursorX, cursorY))) {
                const parentGraph = this.getNodeGraph(parent.getGraphPath())
                return this._getDeepestCompositionAtPointAux(cursorX, cursorY,
                    Array.from(parentGraph.getChildrenGraphs().values()), metaNodeModel) || parent;
            }
        } else {
            return this._getDeepestCompositionAtPointAux(cursorX, cursorY,
                Array.from(this.roots.values()), metaNodeModel);
        }
    }

    _getDeepestCompositionAtPointAux(cursorX: number, cursorY: number, graphs: Graph[], metaNodeModel: MetaNodeModel): MetaNodeModel | undefined {
        let deepestComposition: MetaNodeModel | undefined = undefined;
        let maxDepth = -1;
        const parent = this.getParent(metaNodeModel);
        const parentId = parent?.getID();

        for (const graph of graphs) {
            const node = graph.getNode()
            // @ts-ignore
            if (node.options.pnlClass !== PNLClasses.COMPOSITION) {
                continue;
            }

            // If the node is metaNodeModel and metaNodeModel is a composition, skip it
            if (node.getID() === metaNodeModel.getID()) {
                continue;
            }

            const nodeClippingHelper = getClippingHelper(node);
            if (nodeClippingHelper.getVisibleBoundingBox().containsPoint(new Point(cursorX, cursorY))) {
                // If the current node is the parent of the metaNodeModel, we'll only explore that branch
                if (node.getID() === parentId) {
                    const deeperNode = this._getDeepestCompositionAtPointAux(cursorX, cursorY, Array.from(graph.getChildrenGraphs().values()), metaNodeModel);
                    // If none of the children are a composition that contain the point, return the parent
                    return deeperNode || parent;
                }

                const depth = node.getGraphPath().length;
                if (depth > maxDepth) {
                    deepestComposition = node;
                    maxDepth = depth;
                }
                const childGraphs = Array.from(graph.getChildrenGraphs().values());
                const deeperNode = this._getDeepestCompositionAtPointAux(cursorX, cursorY, childGraphs, metaNodeModel);
                if (deeperNode && deeperNode.getGraphPath().length > maxDepth) {
                    deepestComposition = deeperNode;
                    maxDepth = deeperNode.getGraphPath().length;
                }
            }
        }

        return deepestComposition;
    }


    /**
     * Updates the node in the graph with the given new path.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel to update.
     * @param {string[]} newPath - The new path for the node as an array of strings.
     */
    updateNodeInGraph(metaNodeModel: MetaNodeModel, newPath: string[]) {
        const oldPath = metaNodeModel.getGraphPath();
        let graphToUpdate;

        // If it's a root node, remove it from roots
        if (oldPath.length === 1) {
            graphToUpdate = this.roots.get(metaNodeModel.getID());
            if (!graphToUpdate) {
                throw new Error(`Root not found with ID: ${metaNodeModel.getID()}`);
            }
            this.roots.delete(oldPath[0]);
        } else {
            // If it's not a root, remove it from its parent
            let parentGraph = this.findParentNodeGraph(oldPath);
            graphToUpdate = parentGraph.getChild(metaNodeModel.getID());
            if (!graphToUpdate) {
                throw new Error(`Child not found in parent with ID: ${metaNodeModel.getID()}`);
            }
            parentGraph.deleteChild(metaNodeModel.getID());
        }
        // Update path
        metaNodeModel.setOption('graphPath', newPath);

        // Update path for all descendants
        graphToUpdate.updateDescendantsPath(newPath);

        // Add node to its new parent
        if (newPath.length === 1) {
            this.roots.set(metaNodeModel.getID(), graphToUpdate);
        } else {
            const newPathForParent = newPath.slice(0, newPath.length - 1);
            const newParentGraph = this.getNodeGraph(newPathForParent);
            newParentGraph.addChild(graphToUpdate);
        }

    }

    /**
     * Updates the positions of all children nodes relative to the given node.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel whose children's positions should be updated.
     */
    private updateChildrenPosition(metaNodeModel: MetaNodeModel) {
        const children = this.getChildren(metaNodeModel);

        children.forEach(n => {
            /*
                No need to explicitly call updateChildrenPosition for n children because it will happen automatically in
                the event listener
             */
            const localPosition = n.getLocalPosition()
            n.setPosition(metaNodeModel.getX() + localPosition.x, metaNodeModel.getY() + localPosition.y)
        })
    }

    /**
     * Updates the local positions of all children nodes relative to the given node.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel whose children's positions should be updated.
     */
    private updateChildrenLocalPosition(metaNodeModel: MetaNodeModel) {
        const children = this.getChildren(metaNodeModel);

        children.forEach(n => {
            n.updateLocalPosition(metaNodeModel)
        })
    }

    /**
     * Updates the local position of the given node relative to its parent.
     * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel whose local position should be updated.
     */
    private updateNodeLocalPosition(metaNodeModel: MetaNodeModel) {
        const parent = this.getParent(metaNodeModel)
        metaNodeModel.updateLocalPosition(parent)
    }

    /**
     * Returns the root nodes of the graph
     * @returns {Map<string, Graph>} - The root nodes of the graph
     */
    getRoots(): Map<string, Graph> {
        return this.roots;
    }

    // This method starts the traversal.
    public updateAllLocalPositions() {
        this.roots.forEach(root => {
            this.updateNodeAndChildrenLocalPositions(root, null);
        });
    }

    // This method recursively visits each node and updates its local position.
    private updateNodeAndChildrenLocalPositions(nodeGraph: Graph, parent: MetaNodeModel | null) {
        const node = nodeGraph.getNode();
        if (parent !== null) {
            node.updateLocalPosition(parent);
        }

        nodeGraph.getChildrenGraphs().forEach(childGraph => {
            this.updateNodeAndChildrenLocalPositions(childGraph, node);
        });
    }
}
