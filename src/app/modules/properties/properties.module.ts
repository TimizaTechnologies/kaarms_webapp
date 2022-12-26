import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { PropertiesComponent } from './properties.component';
import {PropertiesRoutingModule} from "./properties-routing.module";



@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
