import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import {UsersRoutingModule} from "./users-routing.module";
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
