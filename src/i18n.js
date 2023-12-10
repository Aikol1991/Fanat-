import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import translationEN from "../public/locales/en/translation.json";
import translationRU from "../public/locales/ru/translation.json";
import translationKG from "../public/locales/kg/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  kg: {
    translation: translationKG,
  },
};

i18n
  .use(intervalPlural)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    lng: "ru",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
