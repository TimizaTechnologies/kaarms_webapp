import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormField} from "../../models/form-field.model";
import {FormfieldControlService} from "../../services/formfield-control.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  @Input() formFields: FormField<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private formfieldService: FormfieldControlService) { }

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
