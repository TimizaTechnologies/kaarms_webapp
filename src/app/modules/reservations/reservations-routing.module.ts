import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from '@modules/reservations/reservations.component';
import { EditComponent } from '@modules/reservations/components/edit/edit.component';
// import { ListComponent } from '@modules/reservations/components/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent,
  },
  {
    path: 'add',
    component: EditComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  /*{
    path: 'list',
    component: ListComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
