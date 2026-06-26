import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import type { ApprovedTransaction } from '../../../types/transaction';
import { formatTime } from '../../../utils/datetime';
import { CardItem, Label, TimeLine, ZoneLine } from './ApprovedTransactionCard.styles';

/** A single approved-transaction card: "Time: HH:mm" and "Time Zone: <region>". */
export const ApprovedTransactionCard = ({ transaction }: { transaction: ApprovedTransaction }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <CardItem>
      <TimeLine>
        <Label>{t('approved.timeLabel')}: </Label>
        {formatTime(transaction.localTimeAtRegion, language)}
      </TimeLine>
      <ZoneLine>
        <Label>{t('approved.timeZoneLabel')}: </Label>
        {transaction.regionName}
      </ZoneLine>
    </CardItem>
  );
};
