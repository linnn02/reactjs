import { useState } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    initialTodos?: Todo[];
}

export function TodoList({ initialTodos = [] }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([
                ...todos,
                { id: Date.now(), text: newTodo.trim(), completed: false }
            ]);
            setNewTodo("");
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        };

        const deleteTodo = (id: number) => {
            setTodos(todos.filter(todo => todo.id !== id));
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
                addTodo();
            }
        };

        return (
            <div className="todo-list">
                <h1>Todo List</h1>
                <div className="todo-input-container">
                    <input type="text"
                    data-testid="todo-input"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new todo..."
                    />
                    <button data-testid="add-button" onClick={addTodo}>Add</button></div>
                    <ul data-testid="todo-list">
                        {todos.map(todo => (
                            <li key={todo.id}
                            data-testid="todo-item"
                            className={todo.completed ? "completed" : ""}
                            >
                            <input type="checkbox"
                            data-testid="todo-checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            />
                            <span data-testid="todo-text">{todo.text}</span><button data-testid="delete-button"
                            onClick={() => deleteTodo(todo.id)}
                            >Delete</button>
                            </li>
                        ))}
                        </ul>
                        
                        <div data-testid="todo-count">
                            {todos.length} todos ({todos.filter(t => t.completed).length} completed)
                            </div>
                        </div>
                            
        );
    }