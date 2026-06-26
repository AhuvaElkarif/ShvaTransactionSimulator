import styled from 'styled-components';

export const CardItem = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 290px;
  padding: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const TimeLine = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkCarouselText};
`;

export const ZoneLine = styled.span`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.darkCarouselText};
`;

export const Label = styled.span`
`;
