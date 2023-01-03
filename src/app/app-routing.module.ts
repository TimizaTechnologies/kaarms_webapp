import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'properties',
    loadChildren: () =>
      import('./modules/properties/properties.module').then(
        m => m.PropertiesModule
      ),
  },
  {
    path: 'tenants',
    loadChildren: () =>
      import('./modules/tenants/tenants.module').then(m => m.TenantsModule),
  },
  {
    path: 'reservations',
    loadChildren: () =>
      import('./modules/reservations/reservations.module').then(
        m => m.ReservationsModule
      ),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./modules/payments/payments.module').then(m => m.PaymentsModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./modules/reviews/reviews.module').then(m => m.ReviewsModule),
  },
  {
    path: 'communication',
    loadChildren: () =>
      import('./modules/communication/communication.module').then(
        m => m.CommunicationModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
