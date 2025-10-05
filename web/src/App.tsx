import React, { useState } from 'react';
import { Box, Alert, Snackbar, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Layout, ContactForm, ContactTable, CacheStats } from './components';
import { Contact, ContactFormState, contactToFormState, createEmptyFormState } from './models';
import { useContacts, useSnackbar } from './hooks';
import config from './config';

export default function App() {
    const { contacts, isLoading, createContact, updateContact, deleteContact } = useContacts();
    const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

    const [formState, setFormState] = useState<ContactFormState>(createEmptyFormState());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormLoading, setIsFormLoading] = useState(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenCreate = () => {
        setFormState(createEmptyFormState());
        setIsFormOpen(true);
    };

    const handleOpenEdit = (contact: Contact) => {
        setFormState(contactToFormState(contact));
        setIsFormOpen(true);
    };

    const handleFormSubmit = async () => {
        setIsFormLoading(true);
        try {
            if (formState.id === null) {
                await createContact(formState);
                showSnackbar('Contacto creado con éxito.', 'success');
            } else {
                await updateContact(formState);
                showSnackbar('Contacto actualizado con éxito.', 'success');
            }
            setIsFormOpen(false);
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Error al guardar el contacto.';
            showSnackbar(msg, 'error');
            console.error('Error al guardar/actualizar contacto:', error);
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(`¿Está seguro de que desea eliminar el contacto con ID ${id}?`)) {
            return;
        }

        try {
            await deleteContact(id);
            showSnackbar(`Contacto ID ${id} eliminado con éxito.`, 'success');
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Error al eliminar el contacto.';
            showSnackbar(msg, 'error');
            console.error('Error al eliminar contacto:', error);
        }
    };

    return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenCreate}
                    disabled={isLoading}
                >
                    Agregar Contacto
                </Button>
            </Box>

            <ContactTable
                contacts={contacts}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
                loading={isLoading}
            />

            <CacheStats />

            <ContactForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                contact={formState}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                loading={isFormLoading}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={config.app.snackbarDuration}
                onClose={hideSnackbar}
            >
                <Alert onClose={hideSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Layout>
    );
}
