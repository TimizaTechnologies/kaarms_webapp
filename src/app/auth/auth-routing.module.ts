import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { NoAuthGuard } from '@auth/guards/no-auth.guard';
import { RegisterComponent } from '@auth/components/register/register.component';
import { ForgotPasswordComponent } from '@auth/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '@auth/components/verify-email/verify-email.component';
import { ChangePasswordComponent } from '@auth/components/change-password/change-password.component';
import { ChangePasswordRequestComponent } from '@auth/components/change-password-request/change-password-request.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'change-password-request',
    component: ChangePasswordRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
