import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Field,
  FloatingLabel,
  NumberInput,
  Colon,
  TimeInputs,
  Unit,
  UnitLabel,
} from './TimePicker.styles';

interface TimePickerProps {
  label: string;
  /** Time as "HH:mm". */
  value: string;
  onChange: (value: string) => void;
}

const pad = (value: number): string => String(value).padStart(2, '0');

const clamp = (raw: string, max: number): number => {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), max);
};

export const TimePicker = ({ label, value, onChange }: TimePickerProps) => {
  const { t } = useTranslation();

  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  useEffect(() => {
    const [h = '00', m = '00'] = value.split(':');
    setHour(h);
    setMinute(m);
  }, [value]);

  const updateTime = (h: string, m: string) => {
    const next = `${pad(clamp(h, 23))}:${pad(clamp(m, 59))}`;
    onChange(next);
  };

  return (
    <Field>
      <FloatingLabel $open>{label}</FloatingLabel>

      <TimeInputs>
        <Unit>
          <NumberInput
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={(e) => {
              const h = e.target.value;
              setHour(h);
              updateTime(h, minute);
            }}
            aria-label={t('simulator.hour')}
            autoFocus
          />
          <UnitLabel>{t('simulator.hour')}</UnitLabel>
        </Unit>

        <Colon>:</Colon>

        <Unit>
          <NumberInput
            type="number"
            min={0}
            max={59}
            value={minute}
            onChange={(e) => {
              const m = e.target.value;
              setMinute(m);
              updateTime(hour, m);
            }}
            aria-label={t('simulator.minute')}
          />
          <UnitLabel>{t('simulator.minute')}</UnitLabel>
        </Unit>
      </TimeInputs>
    </Field>
  );
};