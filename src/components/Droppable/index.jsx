import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});

	const style = {
		opacity: isOver ? 1 : 0.5,
		minHeight: '50px',
		margin: '10px',
		backgroundColor: isOver ? '#333' : 'transparent',
		transition: 'background-color 0.3s ease',
	};

	return (
		<div ref={setNodeRef} style={style}>
			{props.children}
		</div>
	);
}
