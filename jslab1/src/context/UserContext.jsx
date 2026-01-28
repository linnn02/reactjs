import React, { createContext, useContext } from "react";

/**
Контекст хранит общие данные: user, permissions, theme.
*/
export const UserContext = createContext(null);

/**
 * Хук для удобного доступа к контексту.
 * Если вызвать вне Provider выбрасываем понятную ошибку.
 * */
export function useUser() {
    const value = useContext(UserContext);
    if (!value) {
        throw new Error("useUser() должен использоваться внутри <UserProvider>.");
    }

    return value;
}
