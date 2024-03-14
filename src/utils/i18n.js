import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../translation/en.json'
import translationES from '../translation/es.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN
    },
    es: {
      translation: translationES
    }
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  debug: true
})

export default i18n
