import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from '@modules/payments/payments-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, PaymentsRoutingModule, SharedModule],
})
export class PaymentsModule {}
