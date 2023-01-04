import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { TenantsService } from '@modules/tenants/services/tenants.service';
import { PropertiesService } from '@modules/properties/services/properties.service';
import { Property } from '@modules/properties/models/property.model';
import { Tenant } from '@modules/tenants/models/tenant.model';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  reservationForm: FormGroup;
  id: number;
  isEdit: boolean;
  tenants;
  properties;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private reservationsService: ReservationsService,
    private tenantsService: TenantsService,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      cost: ['', Validators.required],
      description: ['', Validators.required],
      start_date: new FormControl<Date | null>(null),
      end_date: new FormControl<Date | null>(null),
      tenantControl: new FormControl<Tenant | null>(null, Validators.required),
      propertyControl: new FormControl<Property | null>(
        null,
        Validators.required
      ),
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.reservationsService.getReservation(this.id).subscribe(data => {
        this.reservationForm.patchValue(data);
      });
    }

    this.getTenants();
    this.getProperties();
  }

  getTenants() {
    return this.tenantsService.getTenants$().subscribe(data => {
      this.tenants = data.results;
    });
  }

  getProperties() {
    return this.propertiesService.getProperties().subscribe(data => {
      this.properties = data.results;
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.reservationsService
        .updateReservation(this.id, this.reservationForm.value)
        .subscribe(data => {
          this.snackBar.open('Updated Successfully', '', {
            duration: 2000,
          });
        });
    } else {
      this.reservationsService
        .createReservation(this.reservationForm.value)
        .subscribe(data => {
          this.snackBar.open('Created Successfully', '', {
            duration: 2000,
          });
        });
    }
  }
}
