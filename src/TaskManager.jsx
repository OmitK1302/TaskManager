import React, { useState } from 'react';

const TaskItem = ({ task, onDelete }) => (
  <div className="task-item">
    <span>{task}</span>
    <button onClick={onDelete} className="delete-button">
      Delete
    </button>
  </div>
);

const TaskList = ({ tasks, onDeleteTask }) => (
  <div>
    {tasks.map((task, index) => (
      <TaskItem key={index} task={task} onDelete={() => onDeleteTask(index)} />
    ))}
  </div>
);

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        className="task-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      {tasks.length === 0 && (
        <div className="empty-state">
          No tasks yet. Add a task to get started!
        </div>
      )}
    </div>
  );
};

export default TaskManager;