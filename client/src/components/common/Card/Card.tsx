import type { ReactNode } from 'react';
import { StyledCard } from './Card.styles';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Elevated surface container used for panels and the simulator form. */
export const Card = ({ children, className }: CardProps) => (
  <StyledCard className={className}>{children}</StyledCard>
);
