import { useTranslation } from 'react-i18next';
import { HeroIllustration } from '../../common/HeroIllustration/HeroIllustration';
import { Badge, Panel, Question } from './HeroPanel.styles';

export const HeroPanel = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Badge>{t('simulator.badge')}</Badge>
      <Question>{t('simulator.question')}</Question>
      <HeroIllustration />
    </Panel>
  );
};
