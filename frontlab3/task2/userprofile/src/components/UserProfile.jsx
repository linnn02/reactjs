import React, { useEffect, useRef, useState } from "react";

export default function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // чтобы уметь отменять предыдущий запрос при Refresh
    const abortRef = useRef(null);

    const fetchUser = async (id) => {
        // отменяем предыдущий запрос, если он ещё идёт
        if (abortRef.current) {
            abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                signal: controller.signal,
            });

            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }

            const data = await res.json();
            setUser(data);
            setLoading(false);
        } catch (err) {
            // AbortError не считаем ошибкой для пользователя
            if (err.name === "AbortError") return;

            setError(err.message || "Unknown error");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(userId);

        // cleanup если компонент размонтируется отменяем fetch
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };

        /*
        userId в dependency array нужен, чтобы при смене userId компонент
        автоматически загружал нового пользователя
        */
    }, [userId]);

    const handleRefresh = () => {
        const randomId = Math.floor(Math.random() * 10) + 1;
        fetchUser(randomId);
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
            <h3>UserProfile</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button onClick={handleRefresh}>Refresh (random user)</button></div>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

                {!loading && !error && user && (
                    <div>
                        <p>
                            <b>ID:</b> {user.id}
                        </p>
                        <p>
                            <b>Name:</b> {user.name}
                        </p>
                        <p>
                            <b>Email:</b> {user.email}
                        </p>
                        <p>
                            <b>Phone:</b> {user.phone}
                        </p>
                        <p>
                            <b>Website:</b> {user.website}
                        </p>
                    </div>)}
        </div>);
}
