import React, { useState } from 'react'
import initialData from './initial-data'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const BeautifulDND = () => {

  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination)
      return

    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) return

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = start.taskIds
      newTaskIds.splice(source.index, 1) 
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      setState({ 
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn, 
        }, 
      })

      return
    }
    
    if (state.columns[destination.droppableId].taskIds.length === 1 && destination.droppableId === 'column-3')
      return

    const startTaskIds = start.taskIds
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = finish.taskIds
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
  
    setState({ 
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart, 
        [newFinish.id]: newFinish, 
      }, 
    })
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Container>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId]
          const tasks = column.taskIds.map(taskId => state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </Container>
    </DragDropContext> 
  ) 
}

export default BeautifulDND
