import styled from 'styled-components';

export const ToggleGroup = styled.div`
  display: inline-flex;
  gap: 8px;
`;

export const ToggleOption = styled.button<{ $active: boolean }>`
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.dark : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${({ theme, $active }) => ($active ? theme.colors.dark : theme.colors.surfaceMuted)};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme, $active }) => ($active ? theme.colors.dark : theme.colors.primaryLight)};
  }
`;
