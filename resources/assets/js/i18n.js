import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

const lng = document.documentElement.lang;

i18n
  .use(XHR)
  .use(reactI18nextModule)
  .init({
    lng,
    fallbackLng: 'en',
    defaultNs: 'global',
    //debug: process.env.NODE_ENV === 'development',
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;
