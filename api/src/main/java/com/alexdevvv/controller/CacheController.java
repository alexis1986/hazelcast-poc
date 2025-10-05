package com.alexdevvv.controller;

import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/cache")
public class CacheController {

    private final HazelcastInstance hazelcastInstance;

    public CacheController(HazelcastInstance hazelcastInstance) {
        this.hazelcastInstance = hazelcastInstance;
    }

    @GetMapping("/stats")
    public Map<String, Object> getCacheStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("instanceName", hazelcastInstance.getName());
        stats.put("clusterName", hazelcastInstance.getConfig().getClusterName());
        stats.put("clusterSize", hazelcastInstance.getCluster().getMembers().size());
        
        IMap<Object, Object> contactsMap = hazelcastInstance.getMap("contacts");
        Map<String, Object> contactsStats = new HashMap<>();
        contactsStats.put("size", contactsMap.size());
        contactsStats.put("localSize", contactsMap.getLocalMapStats().getOwnedEntryCount());
        contactsStats.put("hits", contactsMap.getLocalMapStats().getHits());
        contactsStats.put("getOperationCount", contactsMap.getLocalMapStats().getGetOperationCount());
        contactsStats.put("putOperationCount", contactsMap.getLocalMapStats().getPutOperationCount());
        contactsStats.put("removeOperationCount", contactsMap.getLocalMapStats().getRemoveOperationCount());
        
        stats.put("contactsCache", contactsStats);
        
        return stats;
    }
}
