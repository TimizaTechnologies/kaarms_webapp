import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@shared/shared.module";
import {CommunicationRoutingModule} from "@modules/communication/communication-routing.module";
import { CommunicationComponent } from './communication.component';



@NgModule({
  declarations: [
    CommunicationComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    SharedModule
  ]
})
export class CommunicationModule { }
