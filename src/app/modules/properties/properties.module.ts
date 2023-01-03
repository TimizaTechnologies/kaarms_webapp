import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { PropertiesComponent } from './properties.component';
import { PropertiesRoutingModule } from './properties-routing.module';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '@shared/shared.module';
import { PropertiesService } from '@modules/properties/services/properties.service';

@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    PropertiesComponent,
    AddComponent,
  ],
  imports: [CommonModule, PropertiesRoutingModule, SharedModule],
  providers: [PropertiesService],
})
export class PropertiesModule {}
