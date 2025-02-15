import type { Meta, StoryObj } from '@storybook/react';

import NodeGraph from './NodeGraph';


const meta = {
  component: NodeGraph,
} satisfies Meta<typeof NodeGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		nodes : [
				{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
				{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
			],
		edges: [{ id: 'e1-2', source: '1', target: '2' }]
	}
};
