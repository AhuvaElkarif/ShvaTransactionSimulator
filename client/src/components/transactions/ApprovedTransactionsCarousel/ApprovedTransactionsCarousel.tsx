import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/Button/Button';
import { Spinner } from '../../common/Spinner/Spinner';
import { useApprovedTransactions } from '../../../hooks/useApprovedTransactions';
import { ApprovedTransactionCard } from '../ApprovedTransactionCard/ApprovedTransactionCard';
import {
  ArrowButton,
  Row,
  Section,
  SectionTitle,
  StateBox,
  Track,
} from './ApprovedTransactionsCarousel.styles';

const SCROLL_STEP = 280;

/** Horizontal, arrow-navigable carousel of approved transactions. */
export const ApprovedTransactionsCarousel = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useApprovedTransactions();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  const hasItems = !isLoading && !isError && data && data.length > 0;

  const renderBody = () => {
    if (isLoading) {
      return (
        <StateBox>
          <Spinner />
        </StateBox>
      );
    }
    if (isError) {
      return (
        <StateBox>
          <span>{t('common.error')}</span>
          <Button variant="secondary" onClick={() => void refetch()}>
            {t('common.retry')}
          </Button>
        </StateBox>
      );
    }
    if (!data || data.length === 0) {
      return <StateBox>{t('approved.empty')}</StateBox>;
    }
    return (
      <Track ref={trackRef}>
        {data.map((transaction) => (
          <ApprovedTransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </Track>
    );
  };

  return (
    <Section>
      <SectionTitle>{t('approved.title')}</SectionTitle>
      <Row>
        {hasItems && (
          <ArrowButton type="button" aria-label="previous" onClick={() => scrollBy(-SCROLL_STEP)}>
            ‹
          </ArrowButton>
        )}
        {renderBody()}
        {hasItems && (
          <ArrowButton type="button" aria-label="next" onClick={() => scrollBy(SCROLL_STEP)}>
            ›
          </ArrowButton>
        )}
      </Row>
    </Section>
  );
};
