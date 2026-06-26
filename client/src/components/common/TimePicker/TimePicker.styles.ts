import styled from 'styled-components';

export const Field = styled.div`
  position: relative;
  width: 100%;
`;

export const FloatingLabel = styled.div<{ $open: boolean }>`
  padding: 12px 6px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textTimeZone};
`;

export const Trigger = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid
    ${({ theme, $open }) => ($open ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;
`;

export const ClockIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.15rem;
  line-height: 1;
`;

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-start: 0;
  z-index: 20;
  width: 280px;
  max-width: 90vw;
  padding: 20px;
  background: ${({ theme }) => theme.colors.surfaceViolet};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const PopoverLabel = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 12px;
`;

export const TimeInputs = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

export const Unit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const NumberInput = styled.input`
  width: 98px;
  padding: 10px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;

  /* hide number spinners */
  appearance: textfield;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UnitLabel = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textTimeZone};
  text-align: right;
`;

export const Colon = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 58px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

export const TextAction = styled.button`
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 4px;
  margin-inline-start: auto;
`;
