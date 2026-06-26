import styled from 'styled-components';
import { media } from '../../../styles/theme';

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.darkText};
  background: ${({ theme }) => theme.colors.badgeBackground};
`;

export const Question = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  max-width: 360px;

  ${media('md')} {
    font-size: 1.3rem;
  }
`;
