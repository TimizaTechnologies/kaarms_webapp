import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddInvoiceDialog, TenantDetailComponent} from './components/tenant-detail/tenant-detail.component';
import { TenantsComponent } from './tenants.component';
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    TenantDetailComponent,
    AddInvoiceDialog,
    TenantsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TenantsModule { }
