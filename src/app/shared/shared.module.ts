import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from '@material/material.module';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { HasRoleDirective } from './directives/has-role.directive';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    SearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    SpinnerComponent,
    FluidHeightDirective,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SpinnerComponent,
    DynamicFormComponent,
    DynamicFormInputComponent,
  ],
})
export class SharedModule {}
