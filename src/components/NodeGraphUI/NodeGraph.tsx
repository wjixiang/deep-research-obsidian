import React, { useMemo } from 'react';
import { ReactFlow } from '@xyflow/react';
import { ui } from '../../types/graphNodeUi.types';
import ResearchStartNode from './StartNode';

import '@xyflow/react/dist/style.css';

 
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App({nodes, edges}: ui) {
	const nodeTypes = useMemo(() => ({ startNode: ResearchStartNode }), []);

	const startNode ={
			id: 'node-1',
			type: 'startNode',
			position: { x: 0, y: 0 },
			data: { value: 123 },
		}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<ReactFlow nodeTypes={nodeTypes} nodes={[startNode]} edges={edges} />
		</div>
	);
}

