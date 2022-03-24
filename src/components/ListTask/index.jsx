import React from 'react'

import './styles.css'

export const ListTask = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(({ id, description }) => (
        <li key={id}>{description}</li>
      ))}
    </ul>
  )
}