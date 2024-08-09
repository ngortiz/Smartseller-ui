import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});

	console.log(`Droppable ${props.id} isOver:`, isOver);

	const style = {
		opacity: isOver ? 1 : 0.8,
		minHeight: '50px',
		margin: '10px',
		backgroundColor: isOver ? '#444' : 'transparent',
		border: isOver ? '2px dashed #333' : '2px solid transparent',
		transition: 'background-color 0.3s ease, border 0.3s ease',
	};

	return (
		<div ref={setNodeRef} style={style}>
			{props.children}
		</div>
	);
}
