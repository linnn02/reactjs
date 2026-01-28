import React from "react";
import { useUser } from "../context/UserContext";
import Header from "./Header";

/*
Dashboard показывает имя.
Данные берём из контекста (без props).
*/
export default function Dashboard() {
    const { user, theme } = useUser();

    const style = {
        padding: 16,
        fontSize: theme.fontSize,
        background: theme.darkMode ? "#111" : "#fff",
        color: theme.darkMode ? "#fff" : "#111",
        minHeight: "100vh",
    };

    return (
        <div style={style}>
            <h1>Dashboard</h1>
            <p>Привет, <strong>{user.name}</strong>!
                </p>
                {/* Вложенность: Dashboard -> Header -> UserMenu */}
                <Header />
                </div>);
}
