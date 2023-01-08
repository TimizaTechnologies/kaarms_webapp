import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { ForgotPasswordComponent } from '@auth/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '@auth/components/verify-email/verify-email.component';
import { ChangePasswordRequestComponent } from '@auth/components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from '@auth/components/change-password/change-password.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AuthModule {}
