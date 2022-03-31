import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import { InputTask } from '../../components/InputTask';
import { ListTask } from '../../components/ListTask';

import './styles.css'

export const HomePage = () => {

  const [task, setTask] = React.useState('')
  const [tasks, setTasks] = React.useState([])

  const handleTaskInputChange = (event) => {
    setTask(event.target.value)
  }

  const handleTaskAddButtonClick = async () => {

    try {
      const newTask = { id: uuidv4(), description: task, status: 'pending' }
  
      await fetch('http://localhost:9000/taks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
  
      setTasks(currentTasks => [ ...currentTasks, newTask ])
      setTask('')
    } catch(error) {
      // TODO: tratar o erro de forma mais bonita
      console.log('Xiii deu erro no server ao adicionar uma nova task', error)
    }
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

  const loadTasks = async () => {
    try {
      const response = await fetch('http://localhost:9000/taks')
      const tasks = await response.json()
      setTasks(tasks)
    } catch(error) {
      // TODO: tratar o erro de forma mais bonita
      console.log('Xiii deu erro no server ao consultar as tasks', error)
    }
  }

  React.useEffect(() => {
    loadTasks()
  }, [])

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