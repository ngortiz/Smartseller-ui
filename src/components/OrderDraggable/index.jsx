import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const OrderDraggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id.toString()
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={isDragging ? 'dragging' : ''}
    >
      {children}
    </div>
  )
}
export default OrderDraggable
