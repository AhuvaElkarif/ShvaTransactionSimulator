import { useMutation, useQueryClient } from '@tanstack/react-query';
import { simulateTransaction } from '../api/transactions';
import type { SimulateTransactionRequest, TransactionResult } from '../types/transaction';
import { approvedTransactionsKey } from './useApprovedTransactions';

/**
 * Submits a simulation. On an approved result, the approved-transactions list is invalidated so the
 * new card appears without a manual refresh.
 */
export const useSimulateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SimulateTransactionRequest) => simulateTransaction(request),
    onSuccess: (result: TransactionResult) => {
      if (result.status === 'Approved') {
        void queryClient.invalidateQueries({ queryKey: approvedTransactionsKey });
      }
    },
  });
};
