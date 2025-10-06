import React from 'react';
import {
    TableContainer, Table, TableHead, TableRow, TableCell,
    TableBody, Button, Paper, CircularProgress, Box, Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Contact } from '../models';
import { theme } from '../theme';

interface ContactTableProps {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
    loading: boolean;
}

export const ContactTable: React.FC<ContactTableProps> = ({
    contacts,
    onEdit,
    onDelete,
    loading
}) => (
    <TableContainer component={Paper} sx={{ mt: 3, border: '1px solid #ddd' }}>
        <Table aria-label="tabla de contactos">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teléfono</TableCell>
                    <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <CircularProgress />
                                <Typography sx={{ ml: 2 }}>Cargando contactos...</Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                ) : (
                    contacts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center">No hay contactos registrados.</TableCell>
                        </TableRow>
                    ) : (
                        contacts.map((contact) => (
                            <TableRow key={contact.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell component="th" scope="row">{contact.id}</TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => onEdit(contact)}
                                        startIcon={<Edit />}
                                        size="small"
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(contact.id)}
                                        startIcon={<Delete />}
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )
                )}
            </TableBody>
        </Table>
    </TableContainer>
);
