import { useState } from "react";
import "./App.css";

export default function App() {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleToggle = () => {
    setIsHighlighted((prev) => !prev);
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>React Toggle Highlight</h1>
      <button onClick={handleToggle}>Toggle Highlight</button>
      <p className={isHighlighted ? "highlight" : ""}>
        В React UI зависит от состояния, а не от ручного изменения DOM</p>
        </div>);
        }