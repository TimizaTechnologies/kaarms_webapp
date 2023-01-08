import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { TypedRoute } from '@shared/models/typed-route.model';

const routes: TypedRoute[] = [
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

/*
export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'no-user',
    loadComponent: () => import('./dashboard/no-user.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      isAdmin: true,
    },
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['WRITER', 'READER'],
    },
    loadComponent: () => import('./dashboard/writer-reader.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['CLIENT'],
    },
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
 */
