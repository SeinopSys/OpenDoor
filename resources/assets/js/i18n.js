import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import languageBundle from '@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader';

const lng = document.documentElement.lang;

i18n
  .use(reactI18nextModule)
  .init({
    lng,
    fallbackLng: 'en',
    //debug: process.env.NODE_ENV === 'development',
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    resources: languageBundle,
  });

export default i18n;
