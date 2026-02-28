import { Link, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import type { ComponentType } from "react";

type LazyModule<T extends ComponentType<any>> = { default: T };

function lazyWithDelay<T extends ComponentType<any>>(
  factory: () => Promise<LazyModule<T>>,
  delayMs = 800
) {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise<void>((resolve) => setTimeout(resolve, delayMs)),
    ]).then(([module]) => module)
  );
}


const Dashboard = lazyWithDelay(() => import("./pages/Dashboard"));
const Settings = lazyWithDelay(() => import("./pages/Settings"));
const Profile = lazyWithDelay(() => import("./pages/Profile"));


export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense></div>);
}