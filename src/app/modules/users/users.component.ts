import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }
}
