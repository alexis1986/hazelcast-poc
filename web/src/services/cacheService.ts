import apiClient from './apiClient';
import { CacheStats } from '../models/CacheStats';

const CACHE_STATS_ENDPOINT = '/api/cache/stats';

export class CacheService {
    static async getStats(): Promise<CacheStats> {
        const response = await apiClient.get<CacheStats>(CACHE_STATS_ENDPOINT);
        return response.data;
    }
}

export default CacheService;
