import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from '../add/add.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertiesService } from '@modules/properties/services/properties.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editPropertyForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];
  ngOnInit() {
    this.updatePropertyForm();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private propertiesService: PropertiesService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.propertiesService.getProperty(Number(id)).subscribe(data => {
      // this.languageArray = data.languages;
      this.editPropertyForm.setValue(data);
    });
  }
  /* Update form */
  updatePropertyForm() {
    this.editPropertyForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [''],
    });
  }
  /* Add language */
  add(event: MatChipInputEvent): void {
    const input: any = event.input;
    const value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove language */
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editPropertyForm.controls[controlName].hasError(errorName);
  };
  /* Date */
  formatDate(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editPropertyForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Go to previous page */
  goBack() {
    this.location.back();
  }
  /* Submit property */
  updateProperty() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.propertiesService.updateProperty(
        Number(id),
        this.editPropertyForm.value
      );
      this.router.navigate(['properties/list']);
    }
  }
}
