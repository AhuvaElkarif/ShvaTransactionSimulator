import { Layout } from '../../components/layout/Layout/Layout';
import { ApprovedTransactionsCarousel } from '../../components/transactions/ApprovedTransactionsCarousel/ApprovedTransactionsCarousel';
import { HeroPanel } from '../../components/transactions/HeroPanel/HeroPanel';
import { SimulatorForm } from '../../components/transactions/SimulatorForm/SimulatorForm';
import { HeroGrid } from './SimulatorPage.styles';

/** Main authenticated page: the simulator (left), the hero panel (right), and approved cards. */
export const SimulatorPage = () => (
  <Layout>
    <HeroGrid>
      <SimulatorForm />
      <HeroPanel />
    </HeroGrid>
    <ApprovedTransactionsCarousel />
  </Layout>
);
