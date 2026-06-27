import type { InputHTMLAttributes } from 'react';
import { FieldHint, FieldLabel, FieldWrapper, StyledInput } from './TextField.styles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const TextField = ({ label, hint, error, ...inputProps }: TextFieldProps) => (
  <FieldWrapper>
    <FieldLabel>{label}</FieldLabel>
    <StyledInput $hasError={Boolean(error)} {...inputProps} />
    {(error ?? hint) && <FieldHint $error={Boolean(error)}>{error ?? hint}</FieldHint>}
  </FieldWrapper>
);
