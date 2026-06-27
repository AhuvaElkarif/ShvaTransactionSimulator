export type TransactionStatus = 'Approved' | 'Rejected';

export interface SimulateTransactionRequest {
  region: string;
  timestamp: string;
}

export interface TransactionResult {
  id: string;
  region: string;
  regionName: string;
  status: TransactionStatus;
  submittedAtUtc: string;
  localTimeAtRegion: string;
  reason: string;
}

export interface ApprovedTransaction {
  id: string;
  region: string;
  regionName: string;
  localTimeAtRegion: string;
  submittedAtUtc: string;
  createdAtUtc: string;
}
