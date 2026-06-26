import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  margin-top: 4px;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.85rem;
`;

export const SwitchRow = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SwitchLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
  cursor: pointer;
`;
