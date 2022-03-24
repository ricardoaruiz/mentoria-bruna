import React from 'react'

import './styles.css'

export const InputTask = ({ value, onInputChange, onConfirm }) => {

  return (
    <div className="task-controls">
      <input 
        type="text" 
        className="task-field"
        value={value}
        onChange={onInputChange}
      >
      </input>
      
      <button 
        type="button" 
        className="task-button"
        disabled={!value}
        onClick={onConfirm}
      >
        Adicionar tarefa
      </button>
    </div>
  )
}