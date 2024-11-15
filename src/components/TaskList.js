import React from 'react';
import { Task } from './Task';

export function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        ))}
      </ul>
    </div>
  );
}
