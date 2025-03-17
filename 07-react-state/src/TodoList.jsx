import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), id: Date.now() }]);
      setInput('');
    }
  };

  return (
    <div className="glass-card">
      <h3>待办事项</h3>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="neumorphic-input"
          placeholder="添加新任务"
        />
        <button type="submit" className="neumorphic-btn confirm">
          添加
        </button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="neumorphic-list-item">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}