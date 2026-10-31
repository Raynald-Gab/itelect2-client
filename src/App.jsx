import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  async function loadTasks() {
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      if (!res.ok) throw new Error('Request failed');
      setTasks(await res.json());
      setError('');
    } catch {
      setError('Could not load the tasks.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch(() => setError('Could not load the tasks.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid email or password');
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
  }

  async function addTask(title) {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, userId: user.id }),
    });
    if (!res.ok) throw new Error('Could not add the task');
    await loadTasks();
  }

  return (
    <div>
      <h1>Task Manager</h1>

      {token ? (
        <>
          <p>Logged in as {user.name}</p>
          <TaskForm onAdd={addTask} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && tasks.length === 0 && <p>No tasks yet.</p>}
      {!loading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;