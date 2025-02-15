import ReactDOM from 'react-dom/client';
import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Node, Edge, ReactFlow } from '@xyflow/react';
import React from 'react';

export const RESEARCH_NODE_GRAPH = 'node_graph';

export class DeepResearchNodeGraphView extends ItemView {
  nodes: Node[] = [
		{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
		{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
	]

  edges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return RESEARCH_NODE_GRAPH;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
	const root = ReactDOM.createRoot(container);
	root.render(
	<div style={{ width: '100vw', height: '100vh' }}>
		<ReactFlow nodes={this.nodes} edges={this.edges} />
	</div>)
    
  }

  async onClose() {
    // Nothing to clean up.
  }
}
