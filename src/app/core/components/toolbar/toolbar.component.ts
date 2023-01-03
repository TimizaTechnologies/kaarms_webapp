import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(
    public afAuth: AngularFireAuth,
    public authenticationService: AuthService
  ) {}

  logout(): void {
    this.authenticationService
      .SignOut()
      .then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
