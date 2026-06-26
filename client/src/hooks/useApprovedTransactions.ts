import { useQuery } from '@tanstack/react-query';
import { fetchApprovedTransactions } from '../api/transactions';

/** Query key for the approved-transactions list, reused for cache invalidation after a simulation. */
export const approvedTransactionsKey = ['transactions', 'approved'] as const;

/** Loads the approved transactions shown in the cards grid. */
export const useApprovedTransactions = (limit = 20) =>
  useQuery({
    queryKey: [...approvedTransactionsKey, limit],
    queryFn: () => fetchApprovedTransactions(limit),
  });
