import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@core/components/dashboard/dashboard.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { ProfileComponent } from '@core/components/profile/profile.component';
import { AboutComponent } from '@core/components/about/about.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    /*data: { title: 'Profile' },*/
    data: { breadcrumb: 'Profile' },
  },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
