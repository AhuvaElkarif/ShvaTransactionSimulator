import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { supportedLanguages } from '../../../i18n';
import { ToggleGroup, ToggleOption } from './LanguageToggle.styles';

/** EN / עברית switch that drives both translations and LTR/RTL layout. */
export const LanguageToggle = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <ToggleGroup role="group" aria-label={t('language.label')}>
      {supportedLanguages.map((lng) => (
        <ToggleOption
          key={lng}
          type="button"
          $active={language === lng}
          aria-pressed={language === lng}
          onClick={() => changeLanguage(lng)}
        >
          {t(`language.${lng}`)}
        </ToggleOption>
      ))}
    </ToggleGroup>
  );
};
