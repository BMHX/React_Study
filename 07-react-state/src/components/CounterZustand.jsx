import { useCounterStore } from '../store/counterStore';

export default function CounterZustand() {
  const { count, increment } = useCounterStore();

  return (
    <div className="glass-card">
      <h3>Zustand Counter</h3>
      <div className="counter-display">{count}</div>
      <button
        className="neumorphic-btn"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}