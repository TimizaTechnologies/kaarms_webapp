import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errors = null;
  constructor(
    public fb: FormBuilder,
    route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: ['admin123'],
      password_confirmation: ['admin123'],
      passwordToken: [''],
    });
    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(
        params['token']
      );
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    this.authService.resetPassword(this.changePasswordForm.value).subscribe(
      (result) => {
        alert('Password has been updated');
        this.changePasswordForm.reset();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
