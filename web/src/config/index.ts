interface AppConfig {
    api: {
        baseUrl: string;
        contactsEndpoint: string;
    };
    app: {
        name: string;
        snackbarDuration: number;
    };
}

const config: AppConfig = {
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
        contactsEndpoint: import.meta.env.VITE_API_CONTACTS_ENDPOINT || '/api/contacts',
    },
    app: {
        name: import.meta.env.VITE_APP_NAME || 'Portafolio de Contactos',
        snackbarDuration: parseInt(import.meta.env.VITE_SNACKBAR_DURATION || '6000', 10),
    },
};

export const getContactsApiUrl = (): string => {
    return `${config.api.baseUrl}${config.api.contactsEndpoint}`;
};

export default config;
