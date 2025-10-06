import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import config from '../config';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f4f7f9',
            pt: 4,
            pb: 4
        }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom
                        sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                        {config.app.name}
                    </Typography>
                    {children}
                </Paper>
            </Container>
        </Box>
    </ThemeProvider>
);
