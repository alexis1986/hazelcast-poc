import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Chip,
    CircularProgress,
    Alert,
    Divider,
} from '@mui/material';
import {
    Storage as StorageIcon,
    Group as GroupIcon,
    Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useCacheStats } from '../hooks/useCacheStats';

export const CacheStats: React.FC = () => {
    const { stats, isLoading, error } = useCacheStats();

    if (isLoading && !stats) {
        return (
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                        <CircularProgress />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            Cargando estadísticas...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Alert severity="error">{error}</Alert>
                </CardContent>
            </Card>
        );
    }

    if (!stats) {
        return null;
    }

    const { instanceName, clusterName, clusterSize, contactsCache } = stats;

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <StorageIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6" component="h2">
                        Estadísticas de Caché Hazelcast
                    </Typography>
                    <Chip
                        label="Auto-refresh: 10s"
                        size="small"
                        color="info"
                        sx={{ ml: 'auto' }}
                    />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box mb={3}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        <GroupIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Información del Cluster
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="caption" color="textSecondary">
                                    Nombre de Instancia
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {instanceName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="caption" color="textSecondary">
                                    Nombre del Cluster
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {clusterName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="caption" color="textSecondary">
                                    Tamaño del Cluster
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {clusterSize} miembro(s)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        <TimelineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Caché de Contactos
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="primary.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="primary.dark">
                                    {contactsCache.size}
                                </Typography>
                                <Typography variant="caption" color="primary.dark">
                                    Tamaño Total
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="info.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="info.dark">
                                    {contactsCache.localSize}
                                </Typography>
                                <Typography variant="caption" color="info.dark">
                                    Tamaño Local
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="success.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="success.dark">
                                    {contactsCache.hits}
                                </Typography>
                                <Typography variant="caption" color="success.dark">
                                    Cache Hits
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="secondary.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="secondary.dark">
                                    {contactsCache.getOperationCount}
                                </Typography>
                                <Typography variant="caption" color="secondary.dark">
                                    GET Ops
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="warning.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="warning.dark">
                                    {contactsCache.putOperationCount}
                                </Typography>
                                <Typography variant="caption" color="warning.dark">
                                    PUT Ops
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Box textAlign="center" p={1} bgcolor="error.light" borderRadius={1}>
                                <Typography variant="h5" fontWeight="bold" color="error.dark">
                                    {contactsCache.removeOperationCount}
                                </Typography>
                                <Typography variant="caption" color="error.dark">
                                    REMOVE Ops
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CacheStats;
