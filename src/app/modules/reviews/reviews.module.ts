import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ReviewsComponent } from './reviews.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ReviewsRoutingModule } from '@modules/reviews/reviews-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditComponent } from './components/add-edit/add-edit.component';

@NgModule({
  declarations: [ListComponent, ReviewsComponent, AddComponent, EditComponent, AddEditComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule,
    RouterOutlet,
    NgxPaginationModule,
  ],
})
export class ReviewsModule {}
