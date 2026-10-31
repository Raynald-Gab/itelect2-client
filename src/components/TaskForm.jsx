import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === '') return;
    try {
      await onAdd(title);
      setTitle('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
      />
      <button type="submit">Add</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default TaskForm;