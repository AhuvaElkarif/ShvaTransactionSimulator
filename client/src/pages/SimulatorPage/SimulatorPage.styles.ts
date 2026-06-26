import styled from 'styled-components';
import { media } from '../../styles/theme';

export const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  padding: 12px 0 8px;

  ${media('md')} {
    grid-template-columns: 1fr 2fr;
    gap: 60px;
    padding: 32px 0 16px;
  }
`;
