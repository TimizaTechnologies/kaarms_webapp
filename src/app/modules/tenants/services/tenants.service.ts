import { Injectable } from '@angular/core';
import {Tenant} from "../models/tenant.model";
import {Subject} from "rxjs";
import {Tenants} from "./tenants";
import {Invoice} from "../../payments/models/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  private tenantSubject = new Subject<Tenant>();
  private tenantsSubject = new Subject<Array<Tenant>>();

  constructor() { }

  public requestTenants() {
    this.tenantsSubject.next(Tenants);
  }

  public getTenants() {
    return this.tenantsSubject.asObservable();
  }

  public requestTenant(tenantId: String) {
    let tenant = Tenants.find(cust => {
      return cust._id == tenantId;
    })
    this.tenantSubject.next(tenant);
  }

  public getTenant() {
    return this.tenantSubject.asObservable();
  }

  public deleteTenant(tenantId: String): void {
    let tenantIndex = Tenants.findIndex(cust => {
      return cust._id == tenantId;
    });
    Tenants.splice(tenantIndex, 1);
  }

  // public saveTenant(tenant: Tenant): void {
  public saveTenant(tenant: any): void {
    let index = Tenants.findIndex(cust => {
      return cust._id == tenant._id;
    });
    if (index != -1) {
      Tenants[index] = tenant;
    } else {
      Tenants.unshift(tenant);
    }
  }

  // public addInvoice(tenant: Tenant, invoice: Invoice): void {
  public addInvoice(tenant: any, invoice: any): void {
    let updatedTenant = Tenants.find(cust => {
      return cust._id == tenant._id;
    });
    updatedTenant.invoices.unshift(invoice);
  }
}
