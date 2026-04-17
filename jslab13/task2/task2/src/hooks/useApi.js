import { useCallback, useEffect, useRef, useState } from "react";

export function useApi(apiFunction, dependencies = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(apiFunction));
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);
    
    const execute = useCallback(async () => {
        if (!apiFunction) {
            setLoading(false);
            setData(null);
            setError(null);
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiFunction();
            if (mountedRef.current) {
                setData(result);
            }
        } catch (err) {
            if (mountedRef.current) {
                setError(err.message || "Request failed");
                setData(null);
            }
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [apiFunction, ...dependencies]);
    
    useEffect(() => {
        mountedRef.current = true;
        execute();
        
        return () => {
            mountedRef.current = false;
        };
    }, [execute]);
    
    const refetch = useCallback(() => {
        execute();
    }, [execute]);
    
    return { data, loading, error, refetch };
}

export function useMutation(apiFunction) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const mutate = useCallback(
        async (payload) => {
            setLoading(true);
            setError(null);
            
            try {
                const result = await apiFunction(payload);
                setData(result);
                return result;
            } catch (err) {
                setError(err.message || "Mutation failed");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [apiFunction]
    );
    
    return { mutate, data, loading, error };
}

export function usePaginatedApi(apiFunction, pageSize = 10) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchPage = useCallback(
        async (pageNumber) => {
            setLoading(true);
            setError(null);
            
            try {
                const result = await apiFunction(pageNumber, pageSize);
                setData((prev) => (pageNumber === 1 ? result : [...prev, ...result]));
                setHasMore(result.length === pageSize);
            } catch (err) {
                setError(err.message || "Pagination request failed");
            } finally {
                setLoading(false);
            }
        },
        [apiFunction, pageSize]
    );
    
    useEffect(() => {
        fetchPage(1);
    }, [fetchPage]);
    
    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPage(nextPage);
    }, [loading, hasMore, page, fetchPage]);
    
    const reset = useCallback(() => {
        setPage(1);
        setHasMore(true);
        setData([]);
        fetchPage(1);
    }, [fetchPage]);
    
    return { data, page, hasMore, loading, error, loadMore, reset };
}

export default useApi;