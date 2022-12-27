import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "@core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
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
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
