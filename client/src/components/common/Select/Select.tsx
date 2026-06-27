import type { SelectHTMLAttributes } from 'react';
import { SelectLabel, SelectWrapper, StyledSelect } from './Select.styles';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = ({ label, options, placeholder, value, ...selectProps }: SelectProps) => (
  <SelectWrapper>
    <SelectLabel>{label}</SelectLabel>
    <StyledSelect value={value} {...selectProps}>
      {placeholder !== undefined && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  </SelectWrapper>
);
