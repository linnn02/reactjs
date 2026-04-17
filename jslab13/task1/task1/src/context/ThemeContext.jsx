import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(undefined);

export const lightTheme = {
    name: "light",
    colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        background: "#f8fafc",
        surface: "#ffffff",
        text: "#0f172a",
        textSecondary: "#475569",
        border: "#cbd5e1",
        error: "#dc2626",
        success: "#16a34a",
        warning: "#d97706",
    },
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
    },
    typography: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: {
            xs: "12px",
            sm: "14px",
            md: "16px",
            lg: "20px",
            xl: "24px",
            xxl: "32px",
        },
    },
    borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
    },
};

export const darkTheme = {
    ...lightTheme,
    name: "dark",
    colors: {
        primary: "#60a5fa",
        secondary: "#94a3b8",
        background: "#0f172a",
        surface: "#1e293b",
        text: "#f8fafc",
        textSecondary: "#cbd5e1",
        border: "#475569",
        error: "#f87171",
        success: "#4ade80",
        warning: "#fbbf24",
    },
};

export function ThemeProvider({ children, initialTheme = lightTheme }) {
    const [isDark, setIsDark] = useState(initialTheme.name === "dark");
    
    const theme = isDark ? darkTheme : lightTheme;
    
    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };
    
    const value = useMemo(() => {
        return {
            theme,
            isDark,
            toggleTheme,
        };
    }, [theme, isDark]);
    
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    
    return context;
}

export default ThemeContext;