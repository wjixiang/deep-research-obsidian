import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import styled from 'styled-components';
 
const handleStyle = { left: 10 };

const StyledContainer = styled.div`
	padding: 5px;
	border: 1px gray solid;
	border-radius: 2px;
`
 
function ResearchStartNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
		<StyledContainer>
		<Handle type="target" position={Position.Top} />
		<div>
			<label htmlFor="text">Text:</label>
			<input id="text" name="text" onChange={onChange} className="nodrag" />
		</div>
		<Handle type="source" position={Position.Bottom} id="a" />
		<Handle
			type="source"
			position={Position.Bottom}
			id="b"
			style={handleStyle}
		/>
		</StyledContainer>
    </>
  );
}

export default ResearchStartNode
