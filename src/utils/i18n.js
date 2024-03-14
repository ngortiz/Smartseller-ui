import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importa los archivos de traducción
import translationEN from '../translation/en.json'
import translationES from '../translation/es.json'

// Configura i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN // Traducciones en inglés
    },
    es: {
      translation: translationES // Traducciones en español
    }
  },
  lng: 'es', // Establece el idioma inicial en español
  fallbackLng: 'en', // Si no se encuentra una traducción, usa inglés como fallback
  interpolation: {
    escapeValue: false // No necesitas escapar valores de cadenas traducidas
  },
  debug: true
})

export default i18n
