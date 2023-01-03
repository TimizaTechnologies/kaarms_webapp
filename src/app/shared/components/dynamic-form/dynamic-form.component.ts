import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../models/form-field.model';
import { FormfieldControlService } from '../../services/formfield-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private formFieldService: FormfieldControlService) {}

  ngOnInit(): void {
    this.form = this.formFieldService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
