import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useLanguage } from '../hooks/useLanguage';
import { GlobalStyle } from '../styles/GlobalStyle';
import { buildTheme } from '../styles/theme';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { direction } = useLanguage();

  return (
    <ThemeProvider theme={buildTheme(direction)}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
