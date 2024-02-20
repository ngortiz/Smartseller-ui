import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  })

  const style = {
    opacity: isOver ? 1 : 0.5,
    minHeight: '50px', // Agrega una altura mínima para mejorar la interacción visual
    border: '2px dashed #ccc', // Agrega un borde punteado para resaltar el área de soltado
    margin: '10px' // Agrega un margen para separar las áreas droppable
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
