import { StyledSpinner } from './Spinner.styles';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner = ({ size = 18, className }: SpinnerProps) => (
  <StyledSpinner $size={size} className={className} role="status" aria-label="loading" />
);
