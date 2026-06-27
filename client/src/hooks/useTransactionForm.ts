import { useCallback, useState } from 'react';
import type { SimulateTransactionRequest } from '../types/transaction';
import { nowTimeValue, timeToIsoInstant } from '../utils/datetime';

export const useTransactionForm = () => {
  const [region, setRegion] = useState('');
  const [time, setTime] = useState<string>(nowTimeValue);

  const isValid = region !== '' && time !== '';

  const resetTimeToNow = useCallback(() => setTime(nowTimeValue()), []);

  const buildRequest = useCallback(
    (): SimulateTransactionRequest => ({ region, timestamp: timeToIsoInstant(time) }),
    [region, time],
  );

  return { region, setRegion, time, setTime, isValid, resetTimeToNow, buildRequest };
};
