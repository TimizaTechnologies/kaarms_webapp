import { Injectable } from '@angular/core';
import { GenericResourceService } from '@shared/services/generic-resource.service';
import { HttpClient } from '@angular/common/http';
import { Payment } from '@modules/payments/models/payment.model';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService extends GenericResourceService<Payment> {
  constructor(private http: HttpClient) {
    super(http, Payment, `${environment.apiUrl}payments`);
  }
}
