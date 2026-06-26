/** Possible outcomes of a simulation. Mirrors the backend's TransactionStatus. */
export type TransactionStatus = 'Approved' | 'Rejected';

/** Payload sent to POST /api/transactions/simulate. */
export interface SimulateTransactionRequest {
  /** Region key, e.g. "IL". */
  region: string;
  /** Absolute instant (ISO 8601) the transaction is submitted at. */
  timestamp: string;
}

/** Result returned from a simulation. */
export interface TransactionResult {
  id: string;
  region: string;
  regionName: string;
  status: TransactionStatus;
  submittedAtUtc: string;
  localTimeAtRegion: string;
  reason: string;
}

/** An approved transaction shown in the cards grid. */
export interface ApprovedTransaction {
  id: string;
  region: string;
  regionName: string;
  localTimeAtRegion: string;
  submittedAtUtc: string;
  createdAtUtc: string;
}
