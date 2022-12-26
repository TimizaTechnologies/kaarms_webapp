import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Invoice} from "../../../payments/models/invoice.model";
import {TenantsService} from "../../services/tenants.service";

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.css']
})
export class TenantDetailComponent implements OnInit {
  subscription: Subscription;

  displayedColumns: string[] = ['service', 'value', 'created', 'due'];
  invoices = new MatTableDataSource();

  // @ViewChild(MatPaginator, null) paginator: MatPaginator;

  tenantForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(
    private tenantService: TenantsService,
    public addInvoiceDialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.tenantService.getTenant().subscribe(tenant => {
      this.tenantForm.patchValue(tenant);
      this.invoices = new MatTableDataSource(tenant.invoices);
      // this.invoices.paginator = this.paginator;
    });
  }

  saveTenant(): void {
    if (!this.tenantForm.value._id) {
      this.tenantForm.value._id = String(Math.floor((Math.random() * 10000) + 1));
    }
    this.tenantService.saveTenant(this.tenantForm.value);
    this.tenantService.requestTenant(this.tenantForm.value._id);
    this.tenantService.requestTenants();
  }

  deleteTenant(): void {
    if (confirm("Are you sure?")) {
      this.tenantService.deleteTenant(this.tenantForm.value._id);
      this.tenantService.requestTenants();
      this.clearForm();
    }
  }

  clearForm(): void {
    this.tenantForm.reset();
    this.invoices = new MatTableDataSource();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openAddInvoiceDialog(): void {
    const dialogRef = this.addInvoiceDialog.open(AddInvoiceDialog, {width: '50%', data: new Invoice});

    dialogRef.afterClosed().subscribe(invoice => {
      if (invoice) {
        invoice.created = new Date();
        this.tenantService.addInvoice(this.tenantForm.value, invoice);
        this.tenantService.requestTenant(this.tenantForm.value._id);
      }
    });
  }
}


@Component({
  selector: 'add-invoice',
  templateUrl: 'add-invoice.html'
})

export class AddInvoiceDialog {
  constructor(public dialogRef: MatDialogRef<AddInvoiceDialog>,
              @Inject(MAT_DIALOG_DATA) public invoice: Invoice) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
