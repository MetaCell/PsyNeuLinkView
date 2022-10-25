// import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";
import {MetaLink, MetaNodeModel, MetaLinkModel} from "@metacell/meta-diagram"

class Graph {
    private readonly node: MetaNodeModel;
    private readonly children: Map<string, Graph>;

    constructor(metaNodeModel: MetaNodeModel) {
        this.node = metaNodeModel;
        this.children = new Map<string, Graph>()
    }

    getID() : string{
        return this.node.getID()
    }

    getNode() : MetaNodeModel{
        return this.node
    }

    getChild(id:string) {
        return this.children.get(id)
    }

    addChild(graph: Graph) : void {
        this.children.set(graph.getID(), graph)
    }

    getChildren(): MetaNodeModel[] {
        return Array.from(this.children.values()).map(g => g.getNode())
    }

    getDescendancy(): MetaNodeModel[] {
        const descendancy = this.getChildren()
        for(const graph of Array.from(this.children.values())){
            descendancy.push(...graph.getDescendancy())
        }
        return descendancy
    }

    dfs(id: string): MetaNodeModel | boolean {
        if(this.getID() === id){
            return this.node
        }
        for (let node of Array.from(this.children.values())) {
            const found = node.dfs(id)
            if(found){
                return found
            }
        }
        return false
    }

    getContainerBoundingBox() : any {
        return this.node.getNodeBoundingBox();
    }
}


export class MetaGraph {
    private readonly roots: Map<string, Graph>;
    private readonly links: MetaLinkModel[];

    constructor() {
        this.roots = new Map<string, Graph>()
        this.links = [];
    }

    addLinks(links: MetaLink[]) {
        links.forEach( (child: MetaLink) => {
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

    addNode(metaNodeModel:MetaNodeModel): void {
        const path = metaNodeModel.getGraphPath()
        if(path.length === 1){
            this.roots.set(metaNodeModel.getID(), new Graph(metaNodeModel))
        }else{
            path.pop() // Removes own id from path
            const parentGraph = this.findNodeGraph(path)
            parentGraph.addChild(new Graph(metaNodeModel))
        }
    }

    getNodes() : MetaNodeModel[] {
        const nodes = []
        for(const graph of Array.from(this.roots.values())){
            nodes.push(graph.getNode())
            nodes.push(...graph.getDescendancy())
        }
        return nodes
    }

    getAncestors(node : MetaNodeModel): MetaNodeModel[] {
        const path = node.getGraphPath()
        const oldestAncestor = this.getRoot(path[0])
        return [oldestAncestor.getNode(), ...oldestAncestor.getChildren()]
    }

    getRoot(rootId: string) : Graph{
        const root = this.roots.get(rootId)
        if(root === undefined){
            throw new Error('unknown parent ' + rootId);
        }
        return root
    }

    getChildren(parent : MetaNodeModel): MetaNodeModel[] {
        const path = parent.getGraphPath()
        if (path.length === 1) {
            const root = this.getRoot(parent.getID())
            return root.getChildren()
        } else {
            const graph = this.findNodeGraph(path)
            return graph.getChildren()
        }
    }

    getParent(node : MetaNodeModel): MetaNodeModel | undefined {
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
            if(found){
                // @ts-ignore
                return found
            }
        }
        return undefined
    }

    getNodeContainerBoundingBox(node: MetaNodeModel) : any {
        const graph = this.findNodeGraph(node.getGraphPath())
        return graph.getContainerBoundingBox()
    }

    private findNodeGraph(path: string[]) : Graph {
        const rootId = path.shift()
        // @ts-ignore
        let parent = this.getRoot(rootId)
        while(path.length > 0){
            const next = path.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent === undefined){
                throw new Error('unknown parent ' + rootId);
            }
        }
        return parent
    }

    handleNodePositionChanged(metaNodeModel: MetaNodeModel, cursorX: number, cursorY: number){
        // TODO: Update node parent (add or remove parent)
        //  update node graph path,
        //  bounding boxes of parents

        // Update children position (children should move the same delta as node)
        this.updateChildrenPosition(metaNodeModel)
        //  Update local position / relative position to the parent
        this.updateNodeLocalPosition(metaNodeModel)
        // update the graph for right parent children relationship
        this.updateGraph(metaNodeModel, cursorX, cursorY);
    }

    updateGraph(metaNodeModel: MetaNodeModel, cursorX: number, cursorY: number) {
        let parent = undefined;
        let search = true;
        this.roots.forEach((node, id) => {
            if (node.getContainerBoundingBox().containsPoint(cursorX, cursorY)) {
                parent = node;
            }
        });
        // TODO add the new child to the graph and update graphPath for the metaNodeModel instance
    }

    private updateChildrenPosition(metaNodeModel: MetaNodeModel){
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

    private updateNodeLocalPosition(metaNodeModel: MetaNodeModel){
        const parent = this.getParent(metaNodeModel)
        metaNodeModel.updateLocalPosition(parent)
    }

    updateNodesContainerBoundingBoxes(nodes: MetaNodeModel[]): void {
        nodes.forEach(n => n.setContainerBoundingBox(this.getNodeContainerBoundingBox(n)))
    }
}
