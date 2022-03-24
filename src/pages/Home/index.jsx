import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import { InputTask } from '../../components/InputTask';
import { ListTask } from '../../components/ListTask';
import { TASKS } from '../../constants/data'

import './styles.css'

export const HomePage = () => {

  const [task, setTask] = React.useState('')
  const [tasks, setTasks] = React.useState(TASKS)

  const handleTaskInputChange = (event) => {
    setTask(event.target.value)
  }

  const handleTaskAddButtonClick = () => {    
    setTasks(currentTasks => [ ...currentTasks, { id: uuidv4(), description: task } ])
    setTask('')
  }

  const handleRemoveItemList = (id) => {
    setTasks(state => state.filter((task) => task.id !== id))
  }

  const handleCompleteTask = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = task.status === 'done' ? 'pending' : 'done'
        return task
      }
      return task
    })

    setTasks(newTasks)
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Todo List</h1>

      <InputTask 
        value={task} 
        onInputChange={handleTaskInputChange}
        onConfirm={handleTaskAddButtonClick}
      />

      <ListTask 
        tasks={tasks} 
        onRemoveTask={handleRemoveItemList}
        onCompleteTask={handleCompleteTask}  
      />
    </div>
  )
}