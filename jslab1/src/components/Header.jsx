import React from "react";
import { useUser } from "../context/UserContext";
import UserMenu from "./UserMenu";

/*
Header показывает роль и кнопку темы.
*/
export default function Header() {
    const { user, theme, toggleDarkMode } = useUser();

    const box = {
        marginTop: 16,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 10,
        background: theme.darkMode ? "#1b1b1b" : "#f7f7f7",
    };

    return (
        <div style={box}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                    <div>
                        Роль: <strong>{user.role}</strong>
                        </div>
                        <div>
                        Тема: <strong>{theme.darkMode ? "Тёмная" : "Светлая"}</strong>
                        </div>
                    </div>
                <button type="button" onClick={toggleDarkMode}>
                    Переключить тему
                </button>
            </div>
            <UserMenu />
        </div>); 
}
