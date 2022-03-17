import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import './styles.css'

export const HomePage = () => {

  const [task, setTask] = React.useState('')
  const [tasks, setTasks] = React.useState([
    { id: uuidv4(), description: 'Task #1' },
    { id: uuidv4(), description: 'Task #2' },
    { id: uuidv4(), description: 'Task #3' },
    { id: uuidv4(), description: 'Task #4' },
  ])

  const handleTaskInputChange = (event) => {
    setTask(event.target.value)
  }

  const handleTaskAddButtonClick = () => {    
    setTasks(currentTasks => [ ...currentTasks, { id: uuidv4(), description: task } ])
    setTask('')
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Todo List</h1>

      <div className="task-controls">
        <input 
          type="text" 
          className="task-field"
          value={task}
          onChange={handleTaskInputChange}
        >
        </input>
        
        <button 
          type="button" 
          className="task-button"
          disabled={!task}
          onClick={handleTaskAddButtonClick}
        >
          Adicionar tarefa
        </button>
      </div>

      <ul className="task-list">
        {tasks.map(({ id, description }) => (
          <li key={id}>{description}</li>
        ))}
      </ul>
    </div>
  )
}