import type { ReactNode } from 'react';
import { StyledCard } from './Card.styles';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <StyledCard className={className}>{children}</StyledCard>
);
