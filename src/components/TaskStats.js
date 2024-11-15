import React from 'react';

export function TaskStats({ stats }) {
  return (
    <div>
      <h3>Task Statistics</h3>
      <p>Total Tasks: {stats.total}</p>
      <p>Completed Tasks: {stats.completed}</p>
    </div>
  );
}
