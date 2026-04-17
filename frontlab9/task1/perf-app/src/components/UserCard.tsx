import { memo } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserCardProps {
    user: User;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
    console.log("UserCard render");

    return (
        <div className="card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>);
});