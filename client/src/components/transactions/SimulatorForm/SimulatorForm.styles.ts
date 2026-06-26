import styled from 'styled-components';

export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  max-width: 420px;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.colors.formBackground};
`;

export const HoursHint = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.85rem;
`;


export const TimeZonePicker = styled.div`
  background: ${({ theme }) => theme.colors.surfaceViolet};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
`;