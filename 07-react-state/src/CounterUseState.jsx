import { useState } from 'react';

export default function CounterUseState() {
  const [count, setCount] = useState(0);

  return (
    <div className="glass-card">
      <h3>useState 计数器</h3>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button 
          className="neumorphic-btn"
          onClick={() => setCount(c => c + 1)}
        >
          +
        </button>
        <button
          className="neumorphic-btn"
          onClick={() => setCount(c => c - 1)}
        >
          -
        </button>
        <button
          className="neumorphic-btn reset"
          onClick={() => setCount(0)}
        >
          重置
        </button>
      </div>
    </div>
  );
}