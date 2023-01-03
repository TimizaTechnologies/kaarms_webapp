import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationsService } from '@modules/reservations/services/reservations.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private myService: ReservationsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.myService.getReservation(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.myService
        .updateReservation(this.id, this.form.value)
        .subscribe(data => {
          this.snackBar.open('Updated Successfully', '', {
            duration: 2000,
          });
        });
    } else {
      this.myService.createReservation(this.form.value).subscribe(data => {
        this.snackBar.open('Created Successfully', '', {
          duration: 2000,
        });
      });
    }
  }
}
