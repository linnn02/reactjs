import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("localStorage read error:", error);
            return initialValue;
        }
    });
    
    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore =
                value instanceof Function ? value(storedValue) : value;
                
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn("localStorage write error:", error);
            }
        },
        [key, storedValue]
    );
    
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn("localStorage remove error:", error);
        }
    }, [key, initialValue]);
    
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === key) {
                if (event.newValue === null) {
                    setStoredValue(initialValue);
                } else {
                    setStoredValue(JSON.parse(event.newValue));
                }
            }
        };
        
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [key, initialValue]);
    
    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;