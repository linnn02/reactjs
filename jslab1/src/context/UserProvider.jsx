import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

/*
Provider Pattern: один источник правды и доступ ко всем данным без prop drilling.*/
export default function UserProvider({ children }) {

    const [user] = useState({
        name: "Adel",
        email: "del1@example.com",
        role: "junior",
    });

    const [permissions] = useState({
        canEdit: true,
        canDelete: false,
        canView: true,
    });

    const [theme, setTheme] = useState({
        darkMode: false,
        fontSize: 16,
    });

    function toggleDarkMode() {
        setTheme((prev) => ({ ...prev, darkMode: !prev.darkMode }));
    }

    // чтобы не пересоздавать объект на каждый ререндер
    const contextValue = useMemo(() => {
        return { user, permissions, theme, toggleDarkMode };
    }, [user, permissions, theme]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
            </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
