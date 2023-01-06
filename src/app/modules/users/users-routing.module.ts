import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserResolverService } from './services/user-resolver.service';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: '',
    component: UsersComponent,
    data: { breadcrumb: 'Users' },
    children: [
      {
        path: ':id',
        component: EditComponent,
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
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      breadcrumb: (data: any) => {
        console.log('data', data);
        return `${data.user.name}`;
      },
    },
    resolve: { user: UserResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
