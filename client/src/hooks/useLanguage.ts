import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languageDirection, supportedLanguages, type Language } from '../i18n';

const resolveLanguage = (raw: string): Language =>
  (supportedLanguages as readonly string[]).includes(raw) ? (raw as Language) : 'en';

/**
 * Wraps i18next with direction handling: exposes the active language/direction, keeps the document's
 * `lang`/`dir` attributes in sync, and offers helpers to change or toggle the language.
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();
  const language = resolveLanguage(i18n.language);
  const direction = languageDirection[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const changeLanguage = useCallback(
    (next: Language) => {
      void i18n.changeLanguage(next);
    },
    [i18n],
  );

  const toggleLanguage = useCallback(() => {
    void i18n.changeLanguage(language === 'en' ? 'he' : 'en');
  }, [i18n, language]);

  return { language, direction, changeLanguage, toggleLanguage };
};
