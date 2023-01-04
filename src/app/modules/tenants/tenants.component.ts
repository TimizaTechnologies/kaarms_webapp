import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
// import {MatPaginator} from "@angular/material/paginator";
import { TenantsService } from './services/tenants.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
})
export class TenantsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'phone_number'];
  dataSource = new MatTableDataSource();
  devicesLoaded = false;
  subscription: Subscription;

  // @ViewChild (MatPaginator, null) paginator: MatPaginator;

  constructor(private tenantService: TenantsService) {}

  ngOnInit() {
    this.getTenants();
  }

  getTenants(): void {
    this.subscription = this.tenantService.getTenants().subscribe(tenants => {
      this.dataSource = new MatTableDataSource(tenants);
      // this.dataSource.paginator = this.paginator;
    });
    this.tenantService.requestTenants();
  }

  loadTenant(tenantId: string): void {
    this.tenantService.requestTenant(tenantId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
