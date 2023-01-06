import { Component, OnInit } from '@angular/core';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }
}
