import { useState } from 'react';
import './App.css';
import TopBar from './TopBar.jsx';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="top-bar">
        <TopBar />
      </div>
      <div className="content"></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}
