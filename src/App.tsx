import { useState, useMemo, useCallback, memo } from 'react';
import './App.css';

// Memoized Child Component
const HeavyList = memo(({ items, onItemClick }: { items: string[], onItemClick: (item: string) => void }) => {
  console.log('Rendering HeavyList...');
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index} onClick={() => onItemClick(item)} className="list-item">
          {item}
        </li>
      ))}
    </ul>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');

  const allItems = useMemo(() => [
    'Optimization', 'Memoization', 'Performance', 'React', 'Virtualization', 
    'Lazy Loading', 'Code Splitting', 'Hydration', 'Suspense', 'Profiling'
  ], []);

  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  }, [allItems, query]);

  const handleItemClick = useCallback((item: string) => {
    alert(`Clicked: ${item}`);
  }, []);

  return (
    <div className="performance-lab">
      <h1>Experiment 5: Performance Optimization</h1>
      <p>Using <code>memo</code>, <code>useMemo</code>, and <code>useCallback</code> to prevent unnecessary re-renders.</p>

      <div className="input-group">
        <input 
          type="text" 
          placeholder="Filter items..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="counter-box">
          <p>Unrelated State (Count): {count}</p>
          <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
        </div>
      </div>

      <div className="result-section">
        <h3>Resource Items</h3>
        <HeavyList items={filteredItems} onItemClick={handleItemClick} />
      </div>
    </div>
  );
}

export default App;
