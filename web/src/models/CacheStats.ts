export interface ContactsCacheStats {
    size: number;
    localSize: number;
    hits: number;
    getOperationCount: number;
    putOperationCount: number;
    removeOperationCount: number;
}

export interface CacheStats {
    instanceName: string;
    clusterName: string;
    clusterSize: number;
    contactsCache: ContactsCacheStats;
}
