import { useQuery } from '@tanstack/react-query';
import { fetchApprovedTransactions } from '../api/transactions';

export const approvedTransactionsKey = ['transactions', 'approved'] as const;

export const useApprovedTransactions = (limit = 20) =>
  useQuery({
    queryKey: [...approvedTransactionsKey, limit],
    queryFn: () => fetchApprovedTransactions(limit),
  });
