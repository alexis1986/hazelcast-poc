/**
 * Cliente HTTP configurado para la aplicación
 * Encapsula axios con configuración base
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

/**
 * Instancia de axios configurada con la URL base de la API
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error('API Error:', error.message);
        
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
