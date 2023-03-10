import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from '@modules/properties/services/properties.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-property',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetPropertyForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  propertyForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];
  ngOnInit() {
    this.propertiesService.getProperties();
    this.submitPropertyForm();
  }
  constructor(
    public fb: FormBuilder,
    private propertiesService: PropertiesService
  ) {}
  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }

    /*
     Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
     */
  }
  /* Reactive book form */
  submitPropertyForm() {
    this.propertyForm = this.fb.group({
      name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray],
    });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.propertyForm.controls[controlName].hasError(errorName);
  };
  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Date */
  formatDate(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.propertyForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.propertyForm.reset();
    Object.keys(this.propertyForm.controls).forEach(key => {
      this.propertyForm.controls[key].setErrors(null);
    });
  }
  /* Submit book */
  submitProperty() {
    if (this.propertyForm.valid) {
      this.propertiesService.createProperty(this.propertyForm.value);
      Swal.fire('Success', 'Property Added Successfully!', 'success');
      this.resetForm();
    }
  }
}
