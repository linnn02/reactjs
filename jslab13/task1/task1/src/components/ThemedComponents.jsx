import React from "react";
import withTheme from "../hocs/withTheme";

function BaseButton({ theme, children, variant = "primary", style, ...props }) {
    const variants = {
        primary: {
            backgroundColor: theme.colors.primary,
            color: "#ffffff",
            border: "none",
        },
        secondary: {
            backgroundColor: theme.colors.secondary,
            color: "#ffffff",
            border: "none",
        },
        outline: {
            backgroundColor: "transparent",
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}`,
        },
        ghost: {
            backgroundColor: "transparent",
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
        },
    };
    
    return (
        <button{...props}
        style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            borderRadius: theme.borderRadius.md,
            cursor: "pointer",
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize.md,
            transition: "0.2s ease",
            ...variants[variant],
            ...style,
        }}
        >
        {children}
        </button>);
    }
    
    export const ThemedButton = withTheme(BaseButton);
    
    function BaseCard({ theme, children, elevated = false, style, ...props }) {
        return (
            <div{...props}
            style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.md,
                boxShadow: elevated? theme.name === "dark"
                ? "0 6px 16px rgba(0,0,0,0.35)"
                : "0 6px 16px rgba(0,0,0,0.10)"
                : "none",
                ...style,
            }}
            >
            {children}
            </div>);
        }
        
        export const ThemedCard = withTheme(BaseCard);
        
        function BaseText({ theme, children, variant = "body", style, ...props }) {
            const variants = {
                title: {
                    fontSize: theme.typography.fontSize.xxl,
                    fontWeight: 700,
                    color: theme.colors.text,
                },
                subtitle: {
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: 600,
                    color: theme.colors.text,
                },
                body: {
                    fontSize: theme.typography.fontSize.md,
                    color: theme.colors.text,
                },
                caption: {
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                },
            };
            
            return (
                <div {...props} style={{ ...variants[variant], ...style }}>
                    {children}
                    </div>);
        }
        
        export const ThemedText = withTheme(BaseText);
        
        function BaseInput({ theme, label, error, style, ...props }) {
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.xs }}>
                    {label && (
                        <label style={{
                            color: theme.colors.text,
                            fontSize: theme.typography.fontSize.sm,
                            fontWeight: 600,
                        }}
                        >
                        {label}
                        </label>
                    )}
                    
                    <input{...props}
                    style={{
                        padding: theme.spacing.sm,
                        borderRadius: theme.borderRadius.md,
                        border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                        fontSize: theme.typography.fontSize.md,
                        fontFamily: theme.typography.fontFamily,
                        ...style,
                    }}
                    />
                    
                    {error && (
                        <span style={{
                            color: theme.colors.error,
                            fontSize: theme.typography.fontSize.xs,
                        }}
                        >
                        {error}
                        </span>
                    )}
                    </div>
            );
        }
        
        export const ThemedInput = withTheme(BaseInput);
        
        function BaseThemeSwitcher({ theme, isDark, toggleTheme }) {
            return (
                <button onClick={toggleTheme} style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    cursor: "pointer",
                }}
                >
                {isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
                </button>
            );
        }
        
        export const ThemeSwitcher = withTheme(BaseThemeSwitcher);