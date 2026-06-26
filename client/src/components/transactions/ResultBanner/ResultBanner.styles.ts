import styled from 'styled-components';

export const Banner = styled.div<{ $approved: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $approved }) => ($approved ? theme.colors.success : theme.colors.danger)};
  background: ${({ theme, $approved }) =>
    $approved ? theme.colors.successBg : theme.colors.dangerBg};
`;

export const IconCircle = styled.span<{ $approved: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme, $approved }) => ($approved ? theme.colors.success : theme.colors.danger)};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Title = styled.span<{ $approved: boolean }>`
  font-weight: 700;
  font-size: 1.05rem;
  color: ${({ theme, $approved }) => ($approved ? theme.colors.success : theme.colors.danger)};
`;

export const Reason = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;
