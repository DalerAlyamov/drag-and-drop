import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid ${props => (props.isDragging ? 'lightgreen' : 'lightgrey')};
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
  opacity: ${props => props.isDragDisabled ? '0.5' : '1'}
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 10px;
`

const Task = ({
  task, index
}) => {
  const isDragDisabled = task.id === 'task-1'
  return (
    <Draggable 
      draggableId={task.id} 
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          
          isDragDisabled={isDragDisabled}
        >
          <Handle {...provided.dragHandleProps} />
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}

export default Task
