import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import { InputTask } from '../../components/InputTask';
import { ListTask } from '../../components/ListTask';

import './styles.css'

const TASK_URL = 'http://localhost:9000/tasks'

export const HomePage = () => {

  const [task, setTask] = React.useState('')
  const [tasks, setTasks] = React.useState([])

  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState('')

  const showSuccess = (message, displayTime = 2000) => {
    setSuccess(message)

    setTimeout(() => {
      setSuccess('')
    }, displayTime);
  }

  const showError = (message, displayTime = 2000) => {
    setError(message)

    setTimeout(() => {
      setError('')
    }, displayTime);
  }


  const handleTaskInputChange = (event) => {
    setTask(event.target.value)
  }

  const handleTaskAddButtonClick = async () => {
    try {
      const newTask = { id: uuidv4(), description: task, status: 'pending' }
  
      await fetch(TASK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
  
      setTasks(currentTasks => [ ...currentTasks, newTask ])
      setTask('')
      showSuccess('Task adicionada com sucesso')
    } catch(error) {
      showError('Xiii deu erro no server ao adicionar uma nova task')
    }
  }

  const handleRemoveItemList = async (id) => {
    try {
      await fetch(`${TASK_URL}/${id}`, {
        method: 'DELETE'
      })
  
      setTasks(state => state.filter((task) => task.id !== id))
      showSuccess('Task removida com sucesso')
    } catch(error) {
      showError('Xii deu erro ao remover uma task')
    }
  }

  const handleCompleteTask = async (id) => {
    try{
      const completedTask = tasks.find(task => task.id === id)
      const updatedTask = { ...completedTask, status: completedTask.status === 'done' ? 'pending' : 'done' }
  
      await fetch(`${TASK_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })
  
      const newTasks = tasks.map(task => {
        if (task.id === id) {
          task.status = task.status === 'done' ? 'pending' : 'done'
          return task
        }
        return task
      })
  
      setTasks(newTasks)
      showSuccess('Task alterada com sucesso')
    } catch(error) {
      showError('Xii deu erro ao atualizar uma task')
    }
  }

  const loadTasks = async () => {
    try {
      const response = await fetch(TASK_URL)
      const tasks = await response.json()
      setTasks(tasks)
    } catch(error) {
      showError('Xiii deu erro no server ao consultar as tasks')
    }
  }

  React.useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="home-container">

      {success && (
        <p class="success">{success}</p>
      )}

      {error && (
        <p class="error">{error}</p>
      )}

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