import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div style={{ padding: 16 }}>
      <h2>Counter</h2><p>
        Current value: <b>{count}</b></p>
        <button onClick={increment} style={{ marginRight: 8 }}>
          Increment</button><button onClick={decrement}>Decrement</button></div>);
          }
          
      export default function App() {
          return (
            <div>
              <h1>Lab 1.2 React Setup & Counter</h1><Counter />
              </div>);
}
