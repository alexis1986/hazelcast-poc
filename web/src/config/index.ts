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
        baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
        contactsEndpoint: (import.meta.env.VITE_API_CONTACTS_ENDPOINT || 'contacts').replace(/^\//, ''),
    },
    app: {
        name: import.meta.env.VITE_APP_NAME || 'Portal de Contactos',
        snackbarDuration: parseInt(import.meta.env.VITE_SNACKBAR_DURATION || '6000', 10),
    },
};

export const getContactsApiUrl = (): string => {
    const base = config.api.baseUrl.replace(/\/$/, '');
    const ep = config.api.contactsEndpoint.replace(/^\//, '');
    return `${base}/${ep}`;
};

export default config;
