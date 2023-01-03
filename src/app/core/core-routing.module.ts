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
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
