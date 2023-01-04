import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from '@modules/reviews/models/review.model';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  ratingOptions: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Review
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      rental: [this.data.property, Validators.required],
      user: [this.data.user, Validators.required],
      rating: [this.data.rating, Validators.required],
      comment: [this.data.comment, Validators.required],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
