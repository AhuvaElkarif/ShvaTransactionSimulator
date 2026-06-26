import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { StyledButton, type ButtonVariant } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

/** App button with brand variants and an inline loading state. */
export const Button = ({
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) => (
  <StyledButton
    $variant={variant}
    $fullWidth={fullWidth}
    disabled={disabled === true || isLoading}
    {...rest}
  >
    {isLoading && <Spinner size={16} />}
    {children}
  </StyledButton>
);
