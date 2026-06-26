import styled from 'styled-components';

export const Field = styled.div`
  position: relative;
  width: 100%;
`;

export const Control = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid
    ${({ theme, $open }) => ($open ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: border-color 0.2s ease;
`;

export const FloatingLabel = styled.span<{ $open: boolean }>`
  position: absolute;
  top: -8px;
  inset-inline-start: 12px;
  padding: 0 6px;
  font-size: 0.72rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme, $open }) => ($open ? theme.colors.primary : theme.colors.textMuted)};
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.darkText};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 0.9rem;
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  inset-inline: 0;
  z-index: 20;
  margin: 0;
  padding: 6px;
  list-style: none;
  max-height: 240px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const Option = styled.li<{ $selected: boolean }>`
  padding: 11px 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.95rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.surfaceViolet : 'transparent')};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const EmptyOption = styled.li`
  padding: 11px 12px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
