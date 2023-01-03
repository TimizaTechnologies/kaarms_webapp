import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormField } from '../../../../shared/models/form-field.model';
import { FormfieldControlService } from '../../../../shared/services/formfield-control.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  formFields: Observable<FormField<any>[]>;
  constructor(
    service: FormfieldControlService,
    public afAuth: AngularFireAuth
  ) {
    this.formFields = service.getFormFields();
  }
}
