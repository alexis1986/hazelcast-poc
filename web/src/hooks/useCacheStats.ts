import { useState, useEffect, useCallback } from 'react';
import { CacheStats } from '../models';
import { CacheService } from '../services';

const REFRESH_INTERVAL_MS = 10000;

export const useCacheStats = () => {
    const [stats, setStats] = useState<CacheStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setError(null);
            const data = await CacheService.getStats();
            setStats(data);
            setIsLoading(false);
        } catch (err: any) {
            console.error('Error al obtener estadísticas de caché:', err);
            setError(err.message || 'Error al cargar estadísticas');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();

        const intervalId = setInterval(fetchStats, REFRESH_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [fetchStats]);

    return { stats, isLoading, error, refresh: fetchStats };
};
