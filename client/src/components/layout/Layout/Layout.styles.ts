import styled from 'styled-components';
import { media } from '../../../styles/theme';

export const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 20px 56px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${media('md')} {
    padding: 40px 40px 72px;
    gap: 66px;
  }
`;
