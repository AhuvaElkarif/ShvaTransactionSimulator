/**
 * Design tokens for the app. The palette draws on Shva's teal/navy brand. A single base theme is
 * shared across LTR/RTL; only `direction` changes, and layout uses CSS logical properties so it
 * mirrors automatically for Hebrew.
 */
export type Direction = 'ltr' | 'rtl';

const baseTheme = {
  colors: {
    primary: '#6C4DF6',
    primaryDark: '#5538D8',
    primaryLight: '#B8A6F2',
    accent: '#2B2A4E',
    dark: '#1C1B2A',
    background: '#FFFFFF',
    surface: '#E6E0E9',
    surfaceMuted: '#F4F1FD',
    surfaceViolet: '#D6CCE7',
    textTimeZone: '#49454F',
    text: '#3A3A47',
    textMuted: '#8A8AA0',
    border: '#E6E3F0',
    success: '#1FA971',
    successBg: '#E7F7EF',
    danger: '#E5484D',
    dangerBg: '#FCEBEC',
    white: '#FFFFFF',
    darkText: '#363636',
    darkCarouselText: '#1E1E1E',
    badgeBackground: '#F0F0F066',
    formBackground: '#D6CCE7',
    overlay: 'rgba(28, 27, 42, 0.5)',
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '22px',
    pill: '999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(28, 27, 42, 0.06)',
    md: '0 10px 30px rgba(108, 77, 246, 0.10)',
    lg: '0 24px 60px rgba(108, 77, 246, 0.18)',
  },
  fonts: {
    body: "Rubik, sans-serif",
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
  gradients: {
    brand: 'linear-gradient(135deg, #16C5D6 0%, #0AA3B8 100%)',
    violet: 'linear-gradient(135deg, #7C5CFF 0%, #5538D8 100%)',
  },
} as const;

export type AppTheme = typeof baseTheme & { direction: Direction };

export const buildTheme = (direction: Direction): AppTheme => ({ ...baseTheme, direction });

export const space = (units: number): string => `${units * 4}px`;

export const media = (key: keyof typeof baseTheme.breakpoints): string =>
  `@media (min-width: ${baseTheme.breakpoints[key]})`;
