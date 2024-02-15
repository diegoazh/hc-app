import { defineCustomElements } from '@ionic/pwa-elements/loader';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n-next';

import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import { App } from './App';
import { GeneralErrorPage } from './pages';

// register Swiper custom elements
register();
// Call the element loader before the render call
defineCustomElements(window);

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  response_type: import.meta.env.VITE_OIDC_RESPONSE_TYPE,
  scope: import.meta.env.VITE_OIDC_SCOPE,
  client_secret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <ErrorBoundary FallbackComponent={GeneralErrorPage}>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>,
);
