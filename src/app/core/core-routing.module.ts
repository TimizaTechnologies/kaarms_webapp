import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "@core/components/login/login.component";
import {RegisterComponent} from "@core/components/register/register.component";
import {DashboardComponent} from "@core/components/dashboard/dashboard.component";
import {AuthGuard} from "@core/guards/auth.guard";
import {ForgotPasswordComponent} from "@core/components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "@core/components/verify-email/verify-email.component";
import {ChangePasswordComponent} from "@core/components/change-password/change-password.component";
import {
  ChangePasswordRequestComponent
} from "@core/components/change-password-request/change-password-request.component";
import {ProfileComponent} from "@core/components/profile/profile.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'change-password-request', component: ChangePasswordRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
