import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (isEditing) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, text: input } : todo
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodo = { id: Date.now(), text: input, completed: false };
      setTodos([newTodo, ...todos]);
    }

    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    const toEdit = todos.find(todo => todo.id === id);
    setInput(toEdit.text);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="app">
      <h1>TodoList </h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Add or edit todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <div className="actions">
              <button onClick={() => editTodo(todo.id)}>✏️</button>
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




