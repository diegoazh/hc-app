/// <reference types="vite/client" />

interface ImportMetaEnv {
  // more env variables...
  VITE_OIDC_AUTHORITY: '';
  VITE_OIDC_REDIRECT_URI: '';
  VITE_OIDC_CLIENT_ID: '';
  VITE_OIDC_RESPONSE_TYPE: '';
  VITE_OIDC_SCOPE: '';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
