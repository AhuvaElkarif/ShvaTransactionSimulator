import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useLanguage } from '../hooks/useLanguage';
import { GlobalStyle } from '../styles/GlobalStyle';
import { buildTheme } from '../styles/theme';

/**
 * Provides the styled-components theme and global styles, binding the theme's text direction to the
 * active language so the whole UI switches between LTR and RTL.
 */
export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { direction } = useLanguage();

  return (
    <ThemeProvider theme={buildTheme(direction)}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
