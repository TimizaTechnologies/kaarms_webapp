import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from '@modules/reviews/reviews.component';
import { EditComponent } from '@modules/reviews/components/edit/edit.component';
import { AddComponent } from '@modules/reviews/components/add/add.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
  },
  { path: 'add', component: AddComponent },
  { path: 'add-edit', component: AddEditComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
