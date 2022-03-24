import React from 'react'

import { BsTrash, BsCheck2Circle } from 'react-icons/bs';


import './styles.css'

export const ListTask = ({ tasks, onRemoveTask, onCompleteTask }) => {

  return (
    <ul className="task-list">
      {tasks.map(({ id, description, status }) => (

        <li 
          key={id} 
          className={`
            task-list__item 
            ${status === 'done' 
              ? 'task-list__item--done' 
              : ''
            }`}
        >

          <div 
            className={`
              task-list__item-description 
              ${status === 'done' 
                ? 'task-list__item-description--done' 
                : ''}
              `}
          >
            {description}
          </div>

          <div className="task-list__item-actions">
            <BsCheck2Circle 
              size={16} 
              onClick={() => onCompleteTask(id)}
            />
            
            <BsTrash 
              size={16} 
              onClick={() => onRemoveTask(id)}
            />
          </div>

        </li>
      ))}
    </ul>
  )
}