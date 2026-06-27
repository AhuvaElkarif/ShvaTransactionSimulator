import { apiClient } from './client';
import type {
  ApprovedTransaction,
  SimulateTransactionRequest,
  TransactionResult,
} from '../types/transaction';

export const simulateTransaction = async (
  request: SimulateTransactionRequest,
): Promise<TransactionResult> => {
  const { data } = await apiClient.post<TransactionResult>('/api/transactions/simulate', request);
  return data;
};

export const fetchApprovedTransactions = async (limit = 20): Promise<ApprovedTransaction[]> => {
  const { data } = await apiClient.get<ApprovedTransaction[]>('/api/transactions/approved', {
    params: { limit },
  });
  return data;
};
