import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es/es.json';
import en from './locales/en/en.json';

i18n.use(initReactI18next).init({
  debug: !import.meta.env.PROD,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es,
    en,
  },
});

export default i18n;
