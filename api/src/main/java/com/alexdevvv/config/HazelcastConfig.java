package com.alexdevvv.config;

import com.hazelcast.core.HazelcastInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class HazelcastConfig {

    private static final Logger log = LoggerFactory.getLogger(HazelcastConfig.class);

     @Bean
    public CommandLineRunner hazelcastInfo(HazelcastInstance hazelcastInstance) {
        return args -> {
            log.info("=================================================");
            log.info("Hazelcast iniciado con Spring Cache");
            log.info("Instancia: {}", hazelcastInstance.getName());
            log.info("Cluster: {}", hazelcastInstance.getConfig().getClusterName());
            log.info("Miembros del cluster: {}", hazelcastInstance.getCluster().getMembers().size());
            log.info("Cachés configurados: {}", hazelcastInstance.getConfig().getMapConfigs().keySet());
            log.info("=================================================");
        };
    }
}
