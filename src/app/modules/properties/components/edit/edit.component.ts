import {Component, OnInit, ViewChild} from '@angular/core';
import { Language } from '../add/add.component';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {PropertiesService} from "@modules/properties/services/properties.service";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editBookForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];
  ngOnInit() {
    this.updateBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private bookApi: PropertiesService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bookApi
      .GetBook(id)
      .valueChanges()
      .subscribe((data) => {
        this.languageArray = data.languages;
        this.editBookForm.setValue(data);
      });
  }
  /* Update form */
  updateBookForm() {
    this.editBookForm = this.fb.group({
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
    var input: any = event.input;
    var value: any = event.value;
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
    return this.editBookForm.controls[controlName].hasError(errorName);
  };
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editBookForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Go to previous page */
  goBack() {
    this.location.back();
  }
  /* Submit book */
  updateBook() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.bookApi.UpdateBook(id, this.editBookForm.value);
      this.router.navigate(['properties/list']);
    }
  }
}
