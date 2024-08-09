import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const OrderDraggable = ({ id, children }) => {
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: id.toString(),
	});

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={isDragging ? 'dragging' : ''}
			style={{
				cursor: 'grab',
				opacity: isDragging ? 0.5 : 1,
				backgroundColor: isDragging ? '#ddd' : 'transparent',
				padding: '10px',
				margin: '5px 0',
				border: '1px solid #ccc',
				borderRadius: '4px',
			}}
		>
			{children}
		</div>
	);
};

export default OrderDraggable;
