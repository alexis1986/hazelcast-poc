import { useState, useEffect, useCallback } from 'react';
import { Contact, ContactFormState, formStateToDTO } from '../models';
import { ContactService } from '../services';

export const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await ContactService.getAll();
            setContacts(data);
        } catch (err: any) {
            console.error('Error al cargar contactos:', err);
            setError(err.message || 'Error al cargar contactos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const createContact = async (formState: ContactFormState): Promise<Contact> => {
        const dto = formStateToDTO(formState);
        const newContact = await ContactService.create(dto);
        await fetchContacts();
        return newContact;
    };

    const updateContact = async (formState: ContactFormState): Promise<Contact> => {
        if (formState.id === null) {
            throw new Error('ID del contacto es nulo');
        }
        const dto = formStateToDTO(formState);
        const updatedContact = await ContactService.update(formState.id, dto);
        await fetchContacts();
        return updatedContact;
    };

    const deleteContact = async (id: number): Promise<void> => {
        await ContactService.delete(id);
        await fetchContacts();
    };

    return {
        contacts,
        isLoading,
        error,
        fetchContacts,
        createContact,
        updateContact,
        deleteContact,
    };
};
