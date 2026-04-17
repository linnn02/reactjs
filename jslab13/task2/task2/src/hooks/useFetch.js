import { useCallback, useEffect, useRef, useState } from "react";

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

function getCacheKey(url, options) {
    return `${url}_${JSON.stringify(options || {})}`;
}

function getCachedData(key) {
    const cached = cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
        cache.delete(key);
        return null;
    }
    
    return cached.data;
}

function setCachedData(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
}

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));
    const [error, setError] = useState(null);
    const [cacheHit, setCacheHit] = useState(false);
    const abortControllerRef = useRef(null);
    
    const fetchData = useCallback(async () => {
        if (!url) {
            setLoading(false);
            return;
        }
        
        const cacheKey = getCacheKey(url, options);
        const cached = getCachedData(cacheKey);
        
        if (cached) {
            setData(cached);
            setCacheHit(true);
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setError(null);
        setCacheHit(false);
        
        abortControllerRef.current = new AbortController();
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: abortControllerRef.current.signal,
                headers: {
                    "Content-Type": "application/json",
                    ...CACHE_DURATION(options.headers || {}),
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const result = await response.json();
            setCachedData(cacheKey, result);
            setData(result);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Fetch failed");
            }
        } finally {
            setLoading(false);
        }
    }, [url, options]);
    
    useEffect(() => {
        fetchData();
        
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);
    
    const refetch = useCallback(() => {
        if (!url) return;
        const cacheKey = getCacheKey(url, options);
        cache.delete(cacheKey);
        fetchData();
    }, [url, options, fetchData]);
    
    const clearCache = useCallback(() => {
        cache.clear();
    }, []);
    
    return { data, loading, error, cacheHit, refetch, clearCache };
}

export function useFetchSWR(url, options = {}) {
    const { data, loading, error, cacheHit, refetch } = useFetch(url, options);
    const [isStale, setIsStale] = useState(false);
    
    useEffect(() => {
        if (!data) return;
        
        setIsStale(false);
        const timerId = setTimeout(() => {
            setIsStale(true);
        }, CACHE_DURATION);
        
        return () => clearTimeout(timerId);
    }, [data]);
    
    const revalidate = useCallback(() => {
        setIsStale(false);
        refetch();
    }, [refetch]);
    
    return { data, loading, error, cacheHit, isStale, revalidate };
}

export default useFetch;