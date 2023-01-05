import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import {
  GET_TRANSATIONS,
  GetTransactions,
  GetTransactionsSuccess,
  GET_TRANSATIONS_SUCCESS,
} from '../actions/cash.action';
import { of } from 'rxjs';
import { ITransaction } from '../../models/transaction.model';
import { DataService } from '@shared/services/data.service';

@Injectable()
export class TransactionEffects {
  constructor(private actions$: Actions, public service: DataService) {}
}
