import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from '@modules/reviews/reviews.component';
import { EditComponent } from '@modules/reviews/components/edit/edit.component';
import { ListComponent } from '@modules/reviews/components/list/list.component';
import { AddComponent } from '@modules/reviews/components/add/add.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
  },
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'add', component: AddComponent },
  { path: 'view', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
