import { useCounterStore } from './store/counterStore';

export default function CounterZustand() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="glass-card">
      <h3>Zustand 计数器</h3>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button
          className="neumorphic-btn"
          onClick={increment}
        >
          +
        </button>
        <button
          className="neumorphic-btn"
          onClick={decrement}
        >
          -
        </button>
        <button
          className="neumorphic-btn reset"
          onClick={reset}
        >
          重置
        </button>
      </div>
    </div>
  );
}