/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_CUSTOMERS_ENDPOINT: string
  readonly VITE_APP_NAME: string
  readonly VITE_SNACKBAR_DURATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
