import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <CssBaseline />
            <App />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento raíz con ID "root".');
}
