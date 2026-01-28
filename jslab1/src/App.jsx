import React from "react";
import UserProvider from "./context/UserProvider";
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

/*
App -> ErrorBoundary -> UserProvider -> Dashboard -> Heade -> UserMenu
Все компоненты получают данные через useUser(), без prop drilling
*/
export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </ErrorBoundary>);
}
