import React from 'react';
import {
    Button, TextField, Grid, Dialog, DialogTitle, DialogContent,
    DialogActions, CircularProgress, Box
} from '@mui/material';
import { Save, Close } from '@mui/icons-material';
import { ContactFormState } from '../models';

interface ContactFormProps {
    open: boolean;
    onClose: () => void;
    contact: ContactFormState;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    loading: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    open,
    onClose,
    contact,
    onChange,
    onSubmit,
    loading
}) => {
    const isEditing = contact.id !== null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Nombre"
                                name="name"
                                value={contact.name}
                                onChange={onChange}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={contact.email}
                                onChange={onChange}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="phone"
                                value={contact.phone}
                                onChange={onChange}
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<Close />} disabled={loading} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} startIcon={<Save />} disabled={loading} variant="contained" color="primary">
                    {loading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? 'Guardar Cambios' : 'Crear Contacto')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
