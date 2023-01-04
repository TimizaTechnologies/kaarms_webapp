import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Invoice } from '../../../payments/models/invoice.model';
import { TenantsService } from '../../services/tenants.service';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.css'],
})
export class TenantDetailComponent implements OnInit {
  subscription: Subscription;

  displayedColumns: string[] = ['service', 'value', 'created_date', 'due_date'];
  invoices = new MatTableDataSource();

  // @ViewChild(MatPaginator, null) paginator: MatPaginator;

  tenantForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    notes: new FormControl(''),
  });

  constructor(
    private tenantService: TenantsService,
    public addInvoiceDialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription = this.tenantService.getTenant().subscribe(tenant => {
      this.tenantForm.patchValue(tenant);
      this.invoices = new MatTableDataSource(tenant.invoices);
      // this.invoices.paginator = this.paginator;
    });
  }
  Student;
  saveTenant(): void {
    if (!this.tenantForm.value.id) {
      this.tenantForm.value.id = String(Math.floor(Math.random() * 10000 + 1));
    }
    this.tenantService.saveTenant(this.tenantForm.value);
    this.tenantService.requestTenant(this.tenantForm.value.id);
    this.tenantService.requestTenants();
  }

  deleteTenant(): void {
    if (confirm('Are you sure?')) {
      this.tenantService.deleteTenant(this.tenantForm.value.id);
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
    const dialogRef = this.addInvoiceDialog.open(AddInvoiceDialogComponent, {
      width: '50%',
      data: new Invoice(),
    });

    dialogRef.afterClosed().subscribe(invoice => {
      if (invoice) {
        invoice.created = new Date();
        this.tenantService.addInvoice(this.tenantForm.value, invoice);
        this.tenantService.requestTenant(this.tenantForm.value.id);
      }
    });
  }
}

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.html',
  styleUrls: ['./add-invoice.css'],
})
export class AddInvoiceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public invoice: Invoice
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/*
export class HomePage {
  // File upload task
  fileUploadTask: AngularFireUploadTask;
  // Upload progress
  percentageVal: Observable<number>;
  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;
  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  // Uploaded image collection
  files: Observable<imgFile[]>;
  // Image specifications
  imgName: string;
  imgSize: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;
  private filesCollection: AngularFirestoreCollection<imgFile>;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }
  uploadImage(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(
          (resp) => {
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }
  storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    this.filesCollection
      .doc(fileId)
      .set(image)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
 */

/*
import {Pipe, PipeTransform} from '@angular/core';
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];
@Pipe({
  name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm: boolean): string {
    const units = longForm
      ? FILE_SIZE_UNITS_LONG
      : FILE_SIZE_UNITS;
    let power = Math.round(Math.log(sizeInBytes)/Math.log(1024));
    power = Math.min(power, units.length - 1);
    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];
    return `${formattedSize} ${unit}`;
  }
}
 */

/*
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title> Ionic Firebase File Upload Demo </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-card class="ion-text-center" *ngIf="!isFileUploading && !isFileUploaded">
    <ion-card-header>
      <ion-card-title>Choose Images to Upload</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-button color="primary" size="medium">
        <input type="file" (change)="uploadImage($event.target.files)" />
      </ion-button>
    </ion-card-content>
  </ion-card>
  <!-- File upload progress bar -->
  <div *ngIf="percentageVal | async as percentage">
    Progress: {{ percentage | number }}%
    <ion-progress-bar value="{{ percentage / 100 }}"></ion-progress-bar>
  </div>
  <div *ngIf="trackSnapshot | async as snap">
    File size: {{ snap.totalBytes | formatFileSize }} Data transfered: {{
    snap.bytesTransferred | formatFileSize }}
  </div>
</ion-content>
 */
