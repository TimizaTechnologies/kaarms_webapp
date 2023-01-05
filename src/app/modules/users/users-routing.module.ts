import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  /*{
    path: ':id',
    component: UserComponent,
    data: {
      breadcrumb: (data: any) => {
        console.log('data', data);
        return `${data.user.name}`;
      },
    },
    resolve: { user: UserResolverService },
  },*/
];

/*
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'users',
    component: UserListComponent,
    data: { breadcrumb: 'Users' },
    children: [
      {
        path: ':id',
        component: UserComponent,
        data: {
          breadcrumb: (data: any) => {
            console.log('data', data);
            return `${data.user.name}`;
          },
        },
        resolve: { user: UserResolverService },
      },
    ],
  },
];
*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
