import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  verifyingCredentials: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public authenticationService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {}

  logout(): void {
    this.authenticationService.SignOut();
  }

  login(): void {
    this.verifyingCredentials = true;
    this.authenticationService.SignIn(this.loginForm.value.email, this.loginForm.value.password).catch(error => {
      this.verifyingCredentials = false;
      this.snackBar.open(error.message, "OK", {duration: 5000})
    });
  }
}
