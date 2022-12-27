import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { ReservationsComponent } from './reservations.component';
import {ReservationsRoutingModule} from "@modules/reservations/reservations-routing.module";
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    SharedModule
  ]
})
export class ReservationsModule { }
