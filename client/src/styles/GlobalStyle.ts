import { createGlobalStyle } from 'styled-components';

/** App-wide reset and base styles, theme-aware (colors, direction, fonts). */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    direction: ${({ theme }) => theme.direction};
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button,
  input,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
