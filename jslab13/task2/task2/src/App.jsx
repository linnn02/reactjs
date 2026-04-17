import React, { useMemo, useState } from "react";
import { useApi } from "./hooks/useApi";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";

const boxStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "16px",
  background: "#ffffff",
};

function ApiDemo() {
  const apiFunction = useMemo(() => {
    return async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!response.ok) {
        throw new Error("Failed to load post");
      }
      return response.json();
    };
  }, []);
  
  const { data, loading, error, refetch } = useApi(apiFunction);
  
  return (
    <div style={boxStyle}>
      <h2>useApi</h2>{loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && (
        <div>
          <p><strong>Title:</strong> {data.title}</p><p>{data.body}</p></div>)}
          <button onClick={refetch}>Refetch</button></div>);
}

function LocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage("lab13_name", "");
  
  return (
    <div style={boxStyle}>
      <h2>useLocalStorage</h2><input value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
      style={{ padding: "8px", width: "250px", marginRight: "8px" }}
      />
      <button onClick={removeName}>Clear</button><p>Saved value: {name || "empty"}</p></div>);
}

function DebounceDemo() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 700);
  
  return (
    <div style={boxStyle}>
      <h2>useDebounce</h2><input value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something"
      style={{ padding: "8px", width: "250px" }}
      />
      <p>Current value: {text}</p><p>Debounced value: {debouncedText}</p></div>);
}

function FetchDemo() {
  const { data, loading, error, cacheHit, refetch, clearCache } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  
  return (
    <div style={boxStyle}>
      <h2>useFetch with cache</h2>{loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <p>Cache hit: {cacheHit ? "Yes" : "No"}</p>
      {Array.isArray(data) && (
        <ul>
          {data.slice(0, 5).map((user) => (
            <li key={user.id}>
              {user.name} — {user.email}
              </li>))}
              </ul>)}
              
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={refetch}>Refetch</button><button onClick={clearCache}>Clear cache</button></div></div>);
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "32px",
      fontFamily: "Arial, sans-serif",
    }}
    >
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>Lab 13.2 — Custom Hooks Demo</h1><ApiDemo />
      <LocalStorageDemo />
      <DebounceDemo />
      <FetchDemo />
      </div></div>
  );
}