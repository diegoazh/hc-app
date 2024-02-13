import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n-next';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();
// Call the element loader before the render call
defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
