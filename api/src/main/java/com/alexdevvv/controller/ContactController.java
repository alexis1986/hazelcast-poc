package com.alexdevvv.controller;

import com.alexdevvv.model.Contact;
import com.alexdevvv.service.ContactService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public Collection<Contact> getAllContacts() {
        log.info("API: GET /api/contacts (Buscando todos los contactos)");
        return contactService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        log.info("API: GET /api/contacts/{} (Buscando contacto por ID, usando caché)", id);
        return contactService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contacto no encontrado con ID: " + id));
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) {
        // Asegurar que el ID sea nulo para la creación
        contact.setId(null);
        Contact newContact = contactService.save(contact);
        log.info("API: POST /api/contacts (Contacto creado con ID: {})", newContact.getId());
        return new ResponseEntity<>(newContact, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @Valid @RequestBody Contact contactDetails) {
        log.info("API: PUT /api/contacts/{} (Actualizando contacto)", id);
        return contactService.findById(id)
                .map(existingContact -> {
                    // Actualizar campos
                    existingContact.setName(contactDetails.getName());
                    existingContact.setEmail(contactDetails.getEmail());
                    existingContact.setPhone(contactDetails.getPhone());
                    Contact updatedContact = contactService.save(existingContact);
                    return ResponseEntity.ok(updatedContact);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contacto no encontrado para actualizar con ID: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        log.info("API: DELETE /api/contacts/{} (Eliminando contacto)", id);
        if (contactService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contacto no encontrado para eliminar con ID: " + id);
        }
    }
}
