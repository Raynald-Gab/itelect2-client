import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up project repo', dueDate: '2026-10-21' },
    { id: 2, title: 'Write API documentation', dueDate: '2026-10-25' },
    { id: 3, title: 'Design database schema', dueDate: '2026-10-30' },
  ]);

  function addTask(title) {
    const newTask = { id: Date.now(), title: title, dueDate: 'No due date' };
    setTasks([...tasks, newTask]);
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;