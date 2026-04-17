import { useEffect, useRef, useState } from "react";

export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(timerId);
    }, [value, delay]);
    
    return debouncedValue;
}

export function useDebouncedCallback(callback, delay = 500) {
    const timeoutRef = useRef(null);
    
    const debouncedCallback = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
    
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    
    return debouncedCallback;
}

export default useDebounce;