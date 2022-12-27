import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PropertiesComponent} from "./properties.component";
import {AddComponent} from "@modules/properties/components/add/add.component";
import {ListComponent} from "@modules/properties/components/list/list.component";
import {EditComponent} from "@modules/properties/components/edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent
  },
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'add', component: AddComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
