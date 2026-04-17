import { useState, useCallback, memo } from "react";

interface ButtonProps {
    onClick: () => void;
    label: string;
}

export const Button = memo(function Button({ onClick, label }: ButtonProps) {
    console.log(`Button "${label}" render`);
    return <button onClick={onClick}>{label}</button>;
});

export function ParentComponent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("button clicked");
    }, []);

    const handleIncrement = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <Button onClick={handleClick} label="Click me" />
            <Button onClick={handleIncrement} label="Increment" />
        </div>);
}