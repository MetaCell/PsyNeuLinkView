import {PNLClasses} from "../../constants";
import {MetaLink, MetaNodeModel, MetaLinkModel} from "@metacell/meta-diagram"
import {Point} from "@projectstorm/geometry";

export class Graph {
    private readonly node: MetaNodeModel;
    private readonly children: Map<string, Graph>;

    constructor(metaNodeModel: MetaNodeModel) {
        this.node = metaNodeModel;
        this.children = new Map<string, Graph>()
    }

    getID(): string {
        return this.node.getID()
    }

    getNode(): MetaNodeModel {
        return this.node
    }

    getChild(id: string) {
        return this.children.get(id)
    }

    addChild(graph: Graph): void {
        this.children.set(graph.getID(), graph)
    }

    deleteChild(id: string): void {
        this.children.delete(id);
    }

    getChildren(): MetaNodeModel[] {
        return Array.from(this.children.values()).map(g => g.getNode())
    }

    getChildrenGraphs(): Map<string, Graph> {
        return this.children;
    }

    getDescendancy(): MetaNodeModel[] {
        const descendancy = this.getChildren()
        for (const graph of Array.from(this.children.values())) {
            descendancy.push(...graph.getDescendancy())
        }
        return descendancy
    }

    getDescendancyLinks(nodes: MetaNodeModel[], links: MetaLinkModel[]): MetaLinkModel[] {
        const nodesIds = nodes.map(n => n.getID());
        const linksToReturn = links.filter(l => nodesIds.includes(l.getSourcePort().getNode().getID()) && nodesIds.includes(l.getTargetPort().getNode().getID()));
        return linksToReturn;
    }

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

    getContainerBoundingBox(): any {
        return this.node.getBoundingBox();
    }
}

export class MetaGraph {
    private readonly roots: Map<string, Graph>;
    private readonly links: MetaLinkModel[];
    private parentUpdating: boolean;

    constructor() {
        this.roots = new Map<string, Graph>()
        this.links = [];
        this.parentUpdating = false;
    }

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
    }

    getLinks(): MetaLinkModel[] {
        return this.links;
    }

    addNode(metaNodeModel: MetaNodeModel): void {
        const path = metaNodeModel.getGraphPath()
        if (path.length === 1) {
            this.roots.set(metaNodeModel.getID(), new Graph(metaNodeModel))
        } else {
            path.pop() // Removes own id from path
            const parentGraph = this.findNodeGraph(path)
            parentGraph.addChild(new Graph(metaNodeModel))
        }
    }

    getNodes(): MetaNodeModel[] {
        const nodes = []
        for (const graph of Array.from(this.roots.values())) {
            nodes.push(graph.getNode())
            nodes.push(...graph.getDescendancy())
        }
        return nodes
    }

    getAncestors(node: MetaNodeModel): MetaNodeModel[] {
        const path = node.getGraphPath()
        const oldestAncestor = this.getRoot(path[0])
        return [oldestAncestor.getNode(), ...oldestAncestor.getChildren()]
    }

    getRoot(rootId: string): Graph {
        const root = this.roots.get(rootId)
        if (root === undefined) {
            throw new Error('unknown parent ' + rootId);
        }
        return root
    }

    getChildren(parent: MetaNodeModel): MetaNodeModel[] {
        const path = parent.getGraphPath()
        if (path.length === 1) {
            const root = this.getRoot(parent.getID())
            return root.getChildren()
        } else {
            const graph = this.findNodeGraph(path)
            return graph.getChildren()
        }
    }

    getParent(node: MetaNodeModel): MetaNodeModel | undefined {
        const path = node.getGraphPath()
        if (path.length === 1) {
            return undefined
        } else {
            path.pop() // removes own id from path
            const parentGraph = this.findNodeGraph(path)
            return parentGraph.getNode()
        }
    }

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

    private findNodeGraph(path: string[]): Graph {
        const rootId = path.shift()
        // @ts-ignore
        let parent = this.getRoot(rootId)
        while (path.length > 0) {
            const next = path.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent === undefined) {
                throw new Error('unknown parent ' + rootId);
            }
        }
        return parent
    }

    findNode(node: MetaNodeModel): Graph {
        const path = [...node.getOption('graphPath')]
        const rootId = path.shift()
        // @ts-ignore
        let parent = this.getRoot(rootId)
        while (path.length > 0) {
            const next = path.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent === undefined) {
                throw new Error('unknown parent ' + rootId);
            }
        }
        return parent
    }

    private findParentNodeGraph(path: string[]): Graph {
        const newPath = [...path];
        newPath.pop();
        return this.findNodeGraph(newPath);
    }

    updateGraph(metaNodeModel: MetaNodeModel, cursorX: number, cursorY: number) {
        // update the graph for right parent children relationship
        let pathUpdated = false;
        if (!this.parentUpdating) {
            this.parentUpdating = true;
            let parent: MetaNodeModel | undefined = this.rootContainsNode(metaNodeModel, cursorX, cursorY);
            let newPath = this.findNewPath(metaNodeModel, parent, cursorX, cursorY);
            if (metaNodeModel.getGraphPath().join().toString() !== newPath.join().toString()) {
                pathUpdated = true;
                this.updateNodeInGraph(metaNodeModel, newPath);
            }
            this.handleNodePositionChanged(metaNodeModel);
            this.parentUpdating = false;
        } else {
            this.handleNodePositionChanged(metaNodeModel);
        }
        return pathUpdated;
    }

    handleNodePositionChanged(metaNodeModel: MetaNodeModel) {
        // TODO: Update node parent (add or remove parent)
        //  update node graph path,
        //  bounding boxes of parents

        // Update children position (children should move the same delta as node)
        this.updateChildrenPosition(metaNodeModel)
        //  Update local position / relative position to the parent
        this.updateNodeLocalPosition(metaNodeModel)
    }

    rootContainsNode(metaNodeModel: MetaNodeModel, cursorX: number, cursorY: number): MetaNodeModel | undefined {
        let parent = undefined
        this.roots.forEach((graph, id) => {
            const node = graph.getNode();
            if (node.getID() !== metaNodeModel.getID()
                && node.getOption('shape') === PNLClasses.COMPOSITION
                && node.getBoundingBox().containsPoint(new Point(cursorX, cursorY))) {
                parent = node;
            }
        });
        return parent;
    }

    findNewPath(metaNodeModel: MetaNodeModel, parent: MetaNodeModel | undefined, cursorX: number, cursorY: number) {
        let search: boolean = true;
        let newPath: string[] = [];
        while (search && parent) {
            search = false;
            const children = this.getChildren(parent);
            // eslint-disable-next-line no-loop-func
            children.forEach((child: MetaNodeModel) => {
                if (!search
                    && child.getID() !== metaNodeModel.getID()
                    && child.getOption('shape') === PNLClasses.COMPOSITION
                    && child.getBoundingBox().containsPoint(new Point(cursorX, cursorY))) {
                    search = true;
                    parent = child;
                }
            });
            // @ts-ignore
            newPath = parent.getGraphPath();
        }
        return [...newPath, metaNodeModel.getID()];
    }

    updateNodeInGraph(metaNodeModel: MetaNodeModel, newPath: string[]) {
        const oldPath = metaNodeModel.getGraphPath();
        if (oldPath.length === 1) {
            this.roots.delete(oldPath[0]);
        } else {
            let parentGraph = this.findParentNodeGraph(oldPath);
            parentGraph.deleteChild(metaNodeModel.getID());
        }
        metaNodeModel.setOption('graphPath', newPath);
        this.addNode(metaNodeModel);
    }

    private updateChildrenPosition(metaNodeModel: MetaNodeModel) {
        const children = this.getChildren(metaNodeModel);

        children.forEach(n => {
            /*
                No need to explicitly call updateChildrenPosition for n children because it will happen automatically in
                the event listener
             */
            // @ts-ignore
            const localPosition = n.getLocalPosition()
            n.setPosition(metaNodeModel.getX() + localPosition.x, metaNodeModel.getY() + localPosition.y)
        })
    }

    private updateNodeLocalPosition(metaNodeModel: MetaNodeModel) {
        const parent = this.getParent(metaNodeModel)
        metaNodeModel.updateLocalPosition(parent)
    }

    getRoots(): Map<string, Graph> {
        return this.roots;
    }
}
