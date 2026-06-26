import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkCarouselText};
  font-size: 1.1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const Track = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 6px 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StateBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 36px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;
