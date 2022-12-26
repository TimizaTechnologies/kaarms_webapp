import {Component, OnInit} from '@angular/core';
import {FormfieldControlService} from "./shared/services/formfield-control.service";
// import {getAnalytics} from "@angular/fire/analytics";
// import {initializeApp} from "@angular/fire/app";
// import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormfieldControlService]
})
export class AppComponent implements OnInit {
  title = 'Kaa RMS';

  ngOnInit(): void {
  }
}
