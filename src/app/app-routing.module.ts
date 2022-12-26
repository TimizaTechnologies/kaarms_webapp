import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./core/components/register/register.component";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {LoginComponent} from "./core/components/login/login.component";
import {ForgotPasswordComponent} from "./core/components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./core/components/verify-email/verify-email.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'properties',
    loadChildren: () => import('./modules/properties/properties.module').then(m => m.PropertiesModule)
  },
  {
    path: 'tenants',
    loadChildren: () => import('./modules/tenants/tenants.module').then(m => m.TenantsModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
