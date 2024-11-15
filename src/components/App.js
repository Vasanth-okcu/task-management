import React, { useState, useReducer, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import '../App.css';   // Corrected import path for App.css
import { TaskList } from './TaskList';
import { TaskStats } from './TaskStats';
import { Login } from './Login';
import { UserContext, UserProvider } from '../context/UserContext';   // Corrected import path for UserContext
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialState = {
  tasks: []
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
}

function App() {
  const { user } = useContext(UserContext);  
  const inputRef = useRef(null);  
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks } = state;

  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const addTask = useCallback(() => {
    const newTask = {
      id: Date.now(),
      title: inputRef.current.value,
      completed: false
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    inputRef.current.value = '';  
  }, [dispatch]);

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, [dispatch]);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, [dispatch]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return { total, completed };
  }, [tasks]);

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <Login />  
      
      {user && <h2>Welcome, {user.name}!</h2>}  
      
      <input ref={inputRef} type="text" placeholder="New task" />
      <button onClick={addTask}>Add Task</button>

      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      <TaskStats stats={taskStats} />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
