import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import type { SelectOption } from '../Select/Select';
import {
  Control,
  Dropdown,
  EmptyOption,
  Field,
  FloatingLabel,
  IconButton,
  Input,
  Option,
} from './SearchSelect.styles';

interface SearchSelectProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: SearchSelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick(containerRef, () => setOpen(false));

  const selected = options.find((option) => option.value === value);
  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    setQuery('');
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setQuery('');
    setOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setQuery('');
    setOpen(true);
    inputRef.current?.focus();
  };

  return (
    <Field ref={containerRef}>
      <FloatingLabel $open={open}>{label}</FloatingLabel>
      <Control $open={open} onClick={openMenu}>
        <Input
          ref={inputRef}
          value={open ? query : (selected?.label ?? '')}
          placeholder={placeholder ?? t('simulator.searchPlaceholder')}
          onFocus={openMenu}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          disabled={disabled}
          aria-label={label}
        />
        {(value || query) && (
          <IconButton type="button" onClick={handleClear} aria-label={t('common.clear')}>
            ✕
          </IconButton>
        )}
      </Control>

      {open && (
        <Dropdown role="listbox">
          {filtered.length === 0 ? (
            <EmptyOption>{t('common.noResults')}</EmptyOption>
          ) : (
            filtered.map((option) => (
              <Option
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                $selected={option.value === value}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </Option>
            ))
          )}
        </Dropdown>
      )}
    </Field>
  );
};
