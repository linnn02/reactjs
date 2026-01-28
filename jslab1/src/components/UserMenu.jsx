import React from "react";
import { useUser } from "../context/UserContext";

/*
UserMenu показывает почту и права доступа.
*/
export default function UserMenu() {
    const { user, permissions } = useUser();

    return (
        <div style={{ marginTop: 12 }}>
            <h3>UserMenu</h3>
            <div>
                Email: <strong>{user.email}</strong>
                </div>
                <div style={{ marginTop: 8 }}>
                    <div>Права:</div>
                    <ul>
                        <li>canView: {permissions.canView ? "true" : "false"}</li>
                        <li>canEdit: {permissions.canEdit ? "true" : "false"}</li>
                        <li>canDelete: {permissions.canDelete ? "true" : "false"}</li>
                    </ul>
            </div>
        </div>);
}
