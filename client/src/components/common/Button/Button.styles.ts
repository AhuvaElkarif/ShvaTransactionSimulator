import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primaryDark};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  `,
};

export const StyledButton = styled.button<{ $variant: ButtonVariant; $fullWidth: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 12px 22px;
  font-weight: 600;
  font-size: 0.95rem;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition:
    transform 0.05s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;
