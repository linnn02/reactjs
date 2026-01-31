import React, { useState } from "react";

/*
StepCounter демонстрирует как props и state работают вместе:
props (initialValue, step) приходят от родителя и не меняются внутри компонента
state (count, history, operationCount) хранит данные компонента и меняется через useState
*/
export default function StepCounter({ initialValue = 0, step = 1 }) {
    const [count, setCount] = useState(initialValue);
    const [history, setHistory] = useState([]);
    const [operationCount, setOperationCount] = useState(0);

    const addToHistory = (newValue) => {
        setHistory((prev) => [...prev, newValue]);
    };

    const handleIncrement = () => {
        const newValue = count + step;
        setCount(newValue);
        addToHistory(newValue);
        setOperationCount((prev) => prev + 1);
    };

    const handleDecrement = () => {
        const newValue = count - step;
        setCount(newValue);
        addToHistory(newValue);
        setOperationCount((prev) => prev + 1);
    };

    const handleReset = () => {
        setCount(initialValue);
        setHistory([]);
        setOperationCount(0);
    };

    const lastFive = history.slice(-5);

    return (
        <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <h3>StepCounter</h3>
            <p>
                <b>Current count:</b> {count}
                </p>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <button onClick={handleIncrement}>Increment (+{step})</button>
                    <button onClick={handleDecrement}>Decrement (-{step})</button>
                    <button onClick={handleReset}>Reset</button></div>
                    <p>
                        <b>Total operations:</b> {operationCount}
                        </p>
                        <div>
                            <b>History (last 5):</b>{lastFive.length === 0 ? (
                                <p style={{ marginTop: 6 }}>No history yet</p>) : (
                                    <ul style={{ marginTop: 6 }}>
                                        {lastFive.map((val, idx) => (
                                                <li key={`${val}-${idx}`}>{val}</li>))}
                                    </ul>)}
                        </div>
                </div>);
}
