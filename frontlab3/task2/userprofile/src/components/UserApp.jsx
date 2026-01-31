import React, { useState } from "react";
import UserProfile from "./UserProfile";

export default function UserApp() {
    const [userId, setUserId] = useState(1);

    return (
        <div style={{ maxWidth: 520, margin: "0 auto", fontFamily: "Arial" }}>
            <h2>User Loader App</h2>

            {/* по нажатию кнопок будет меняться userId и UserProfile загрузит данные заново. */}


            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={() => setUserId(1)}>User 1</button>
                <button onClick={() => setUserId(2)}>User 2</button>
                <button onClick={() => setUserId(3)}>User 3</button></div>
                <UserProfile userId={userId} />
            </div>);
}
            