function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.completed ? 'done' : 'pending'}
          {task.User ? ` (${task.User.name})` : ''}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;