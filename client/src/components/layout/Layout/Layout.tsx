import type { ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Main, Page } from './Layout.styles';

export const Layout = ({ children }: { children: ReactNode }) => (
  <Page>
    <Header />
    <Main>{children}</Main>
  </Page>
);
