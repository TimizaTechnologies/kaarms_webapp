import { ITransaction } from '../../models/transaction.model';

export interface ITransactionState {
  transactions: ITransaction[];
}

export const initialTransactionState: ITransactionState = {
  transactions: null,
};
