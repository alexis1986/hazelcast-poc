import { useState, useCallback } from 'react';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

interface UseSnackbarResult {
    snackbar: SnackbarState;
    showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
    hideSnackbar: () => void;
}

export const useSnackbar = (): UseSnackbarResult => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    }, []);

    return {
        snackbar,
        showSnackbar,
        hideSnackbar,
    };
};

export default useSnackbar;
