import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedText,
  ThemeSwitcher,
} from "./components/ThemedComponents";

function DemoPage() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: theme.colors.background,
      padding: theme.spacing.xl,
      fontFamily: theme.typography.fontFamily,
    }}
    >
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing.lg,
      }}
      >
      <ThemedText variant="title">Lab 13.1 — withTheme HOC Demo</ThemedText><ThemeSwitcher />
      </div>
      <ThemedCard elevated style={{ marginBottom: theme.spacing.lg }}>
        <ThemedText variant="subtitle" style={{ marginBottom: theme.spacing.sm }}>
          Компоненты с темой
          </ThemedText>
          <ThemedText variant="body" style={{ marginBottom: theme.spacing.md }}>
            Эта карточка, текст, кнопки и input получают тему через Higher-Order Component withTheme.
              </ThemedText>
              <div style={{ display: "flex", gap: theme.spacing.sm, flexWrap: "wrap" }}>
                <ThemedButton variant="primary">Primary</ThemedButton>
                <ThemedButton variant="secondary">Secondary</ThemedButton>
                <ThemedButton variant="outline">Outline</ThemedButton>
                <ThemedButton variant="ghost">Ghost</ThemedButton>
                </div>
                </ThemedCard>
                <ThemedCard elevated style={{ marginBottom: theme.spacing.lg }}>
                  <ThemedText variant="subtitle" style={{ marginBottom: theme.spacing.md }}>
                    Поля ввода
                    </ThemedText>
                    <div style={{ display: "grid", gap: theme.spacing.md }}>
                      <ThemedInput label="Имя пользователя" placeholder="Введите имя" />
                      <ThemedInput label="Email"
                      placeholder="Введите email"
                      error="Поле заполнено неверно"
                      />
                      </div></ThemedCard>
                      <ThemedCard>
                        <ThemedText variant="caption">
                          Текущая тема: {theme.name}
                          </ThemedText></ThemedCard></div>
                          </div>
    );
  }
  
  export default function App() {
    return (
      <ThemeProvider>
        <DemoPage />
        </ThemeProvider>);
  }