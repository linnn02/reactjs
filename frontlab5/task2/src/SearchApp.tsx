import { useState } from "react";
import type { User } from "./types";

const INITIAL_DATA: User[] = [
    { name: "Alice", email: "alice@mail.com", age: 25 },
    { name: "Bob", email: "bob@mail.com", age: 30 },
    { name: "Linn", email: "linn@mail.com", age: 22 },
    { name: "Ann", email: "ann@mail.com", age: 28 },
    { name: "Eren", email: "eren@mail.com", age: 19 },
];

const SearchApp = () => {
    const [users] = useState<User[]>(INITIAL_DATA);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(INITIAL_DATA);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        setFilteredUsers(
            users.filter((u) => u.name.toLowerCase().includes(term.toLowerCase()))
        );
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSearchTerm("");
        setFilteredUsers(users);
    };

    return (
        <div style={{ padding: 20 }}>
        <h2>User Search</h2>

        <input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name..."
        />
        <button onClick={handleClear} style={{ marginLeft: 10 }}>
            Clear
        </button>

        <div style={{ marginTop: 20 }}>
            {filteredUsers.length === 0 ? (
            <p>No results found</p>
            ) : (
            filteredUsers.map((u) => (
                <div key={u.email}>
                <b>{u.name}</b> — {u.email} — Age: {u.age}
                </div>
            ))
            )}
        </div>
        </div>
    );
};
export default SearchApp;