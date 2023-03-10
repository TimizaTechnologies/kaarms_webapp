import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddInvoiceDialogComponent,
  TenantDetailComponent,
} from './components/tenant-detail/tenant-detail.component';
import { TenantsComponent } from './tenants.component';
import { SharedModule } from '@shared/shared.module';
import { TenantsRoutingModule } from '@modules/tenants/tenants-routing.module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    TenantDetailComponent,
    AddInvoiceDialogComponent,
    TenantsComponent,
    ListComponent,
  ],
  imports: [CommonModule, TenantsRoutingModule, SharedModule],
})
export class TenantsModule {}
