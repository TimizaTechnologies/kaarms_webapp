import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    SearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    SpinnerComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SpinnerComponent,
    DynamicFormComponent,
  ]
})
export class SharedModule { }
