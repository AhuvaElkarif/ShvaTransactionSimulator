import styled from 'styled-components';
import { media } from '../../../styles/theme';

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: saturate(180%) blur(6px);

  ${media('md')} {
    padding: 16px 40px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserArea = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  ${media('sm')} {
    display: flex;
  }
`;

export const Greeting = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    display: none;
  }
`;
