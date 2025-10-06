package com.alexdevvv.service;

import com.alexdevvv.model.Contact;
import com.alexdevvv.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Collection<Contact> findAll() {
        log.info("Obteniendo todos los contactos del repositorio");
        return contactRepository.findAll();
    }

    @Cacheable(value = "contacts", key = "#id", unless = "#result == null")
    public Optional<Contact> findById(Long id) {
        log.info("Cache MISS - Buscando Contact ID: {} en el repositorio", id);
        return contactRepository.findById(id);
    }

    @CacheEvict(value = "contacts", key = "#contact.id", beforeInvocation = false)
    public Contact save(Contact contact) {
        log.info("Guardando Contact ID: {} y evictando de la caché", contact.getId());
        return contactRepository.save(contact);
    }

    @CacheEvict(value = "contacts", key = "#id", beforeInvocation = true)
    public boolean deleteById(Long id) {
        log.info("Eliminando Contact ID: {} del repositorio y de la caché", id);
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
