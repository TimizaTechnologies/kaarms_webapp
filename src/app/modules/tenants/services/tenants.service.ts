import { Injectable } from '@angular/core';
import {catchError, Observable, Subject} from "rxjs";
import {Tenants} from "./tenants";
import {Invoice} from "../../payments/models/invoice.model";
import {environment} from "@envs";
import {HttpClient} from "@angular/common/http";
import {HttpErrorHandler} from "@shared/services/http-error-handler.service";
import {Tenant} from "@modules/tenants/models/tenant.model";

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  private tenantUrl: string = `${environment.apiUrl}tenants`;
  private tenantSubject = new Subject<Tenant>();
  private tenantsSubject = new Subject<Array<Tenant>>();

  constructor(private http: HttpClient, private eh: HttpErrorHandler) { }


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

  createTenant(tenant: Tenant): Observable<Tenant> {
    return this.http
      .post<Tenant>(this.tenantUrl, tenant)
      .pipe(catchError(this.eh.handleError));
  }

  getTenant$(id: number): Observable<Tenant> {
    return this.http
      .get<Tenant>(`${this.tenantUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getTenants$(): Observable<Tenant[]> {
    return this.http
      .get<Tenant[]>(`${this.tenantUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateTenant(id: number, asset: Partial<Tenant>): Observable<Tenant> {
    return this.http
      .patch<Tenant>(`${this.tenantUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteTenant$(id: number): Observable<Tenant> {
    return this.http
      .delete<Tenant>(`${this.tenantUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
