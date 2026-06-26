import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import type { TransactionResult } from '../../../types/transaction';
import { formatTime } from '../../../utils/datetime';
import { Banner, Content, IconCircle, Reason, Title } from './ResultBanner.styles';

/** Approved/Rejected outcome banner with a localized explanation. */
export const ResultBanner = ({ result }: { result: TransactionResult }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const approved = result.status === 'Approved';

  const reason = t(approved ? 'result.approvedReason' : 'result.rejectedReason', {
    region: result.regionName,
    time: formatTime(result.localTimeAtRegion, language),
  });

  return (
    <Banner $approved={approved} role="status" aria-live="polite">
      <IconCircle $approved={approved} aria-hidden="true">
        {approved ? '✓' : '✕'}
      </IconCircle>
      <Content>
        <Title $approved={approved}>{t(approved ? 'result.approved' : 'result.rejected')}</Title>
        <Reason>{reason}</Reason>
      </Content>
    </Banner>
  );
};
