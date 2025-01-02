import { en } from '../locales/en.js';
import { tr } from '../locales/tr.js';

const resources = { en, tr };
let currentLang = 'en'; // Default language

export function t(path) {
    const keys = path.split('.');
    let value = resources[currentLang];
    keys.forEach(k => value = value?.[k]);
    return value || path;
}

export function setLanguage(lang) {
    if (resources[lang]) {
        currentLang = lang;
        document.documentElement.lang = lang; // Update the document language
    }
}