class GraphNode:
    def __init__(self, node, parent=None, children=None):
        self.name = node.name
        self._node = node
        self._parent = None
        self.set_parent(parent)
        self._children = {}
        if children is not None:
            for child in children:
                self.add_child(child)

    def add_child(self, node):
        if isinstance(node, GraphNode):
            self._children[node.name] = node
        else:
            self._children[node] = GraphNode(node, self)
        if self._children[node.name].get_parent() is not self:
            self._children[node.name].set_parent(self)

    def remove_child(self, node):
        if node.name in list(self._children):
            # self._children[node.name].set_parent(None)
            del self._children[node.name]

    def get_child(self, name):
        if name in list(self._children):
            return self._children[name]
        else:
            return None

    def get_children(self):
        return self._children

    def get_parent(self):
        return self._parent

    def get_node(self):
        return self._node

    def set_parent(self, parent):
        if parent is not None:
            if isinstance(parent, GraphNode) is False:
                raise Exception("Parent must be a GraphNode")
            if self._parent is not None:
                self._parent.remove_child(self)
            self._parent = parent
            if self.name not in parent.get_children():
                parent.add_child(self)
        else:
            if self._parent is not None:
                self._parent.remove_child(self)
            self._parent = parent

    def set_node(self, node):
        self._node = node


class ModelGraph:
    def __init__(self):
        self._graph = {}

    def add_node(self, node, parent=None):
        # ensure we are not duplicating the node
        node_found = self.find_node(node)
        if node_found is None:
            node_found = node if isinstance(node, GraphNode) else GraphNode(node)
            if parent is not None:
                parent_found = self.find_node(parent)
                if parent_found is None:
                    parent_found = GraphNode(parent)
                    self.add_node(parent)
                node_found.set_parent(parent_found)
            else:
                self._graph[node.name] = node_found
            return True
        else:
            return False

    def move_node(self, node, parent):
        node_found = self.find_node(node)
        parent_found = self.find_node(parent)
        if parent_found is None:
            self.add_node(parent)
            parent_found = self.find_node(parent)
        if node_found is not None:
            if node_found.get_parent() is None and self._graph[node.name] is not None:
                del self._graph[node.name]
            node_found.set_parent(parent_found)
        else:
            self.add_node(node, parent_found)

    def find_node(self, node):
        test = self.get_all_nodes()
        for graphNode in self.get_all_nodes():
            if node.name == graphNode.name:
                return graphNode
        return None

    def get_node_children(self, node):
        for child in list(node.get_children()):
            yield node.get_child(child)
            yield from self.get_node_children(node.get_child(child))

    def get_all_nodes(self):
        for child in list(self._graph):
            yield self._graph[child]
            yield from self.get_node_children(self._graph[child])

    def remove_node(self, node):
        node_found = self.find_node(node)
        if node_found is not None:
            if node_found.get_parent() is not None:
                node_found.get_parent().remove_child(node_found)
            else:
                if node.name in list(self._graph):
                    del self._graph[node_found.name]

    def get_graph(self):
        return self._graph
