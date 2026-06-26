import { StyledSpinner } from './Spinner.styles';

interface SpinnerProps {
  /** Diameter in pixels. */
  size?: number;
  className?: string;
}

/** Minimal inline loading spinner that inherits the current text color. */
export const Spinner = ({ size = 18, className }: SpinnerProps) => (
  <StyledSpinner $size={size} className={className} role="status" aria-label="loading" />
);
