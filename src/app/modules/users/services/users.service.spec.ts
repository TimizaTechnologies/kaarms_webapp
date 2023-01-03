import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpSpy: Spy<HttpClient>;
  let fakeUsers: User[] = [
    {
      id: 1,
      name: 'Fake Customer',
      email: 'fake@fake.com',
      password: 'fake@pass',
    },
    {
      id: 2,
      name: 'Fake Customer Two',
      email: 'fake-two@fake.com',
      password: 'fake-two@pass',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(UsersService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an expected list of users', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeUsers);

    service.getUsers().subscribe((users) => {
      expect(users).toHaveSize(fakeUsers.length);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create a new user', (done: DoneFn) => {
    const newUser = {
      name: 'New User',
      email: 'new@user.com',
      password: 'new@user',
    } as User;

    httpSpy.post.and.nextWith(newUser);

    service.createUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
      done();
    }, done.fail);
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update a user with given user id', (done: DoneFn) => {
    var user = fakeUsers[0];
    user.name = 'Updated User';

    httpSpy.put.and.nextWith(user);

    service.updateUser(user.id, user).subscribe((customer) => {
      expect(customer.name).toEqual('Updated Customer');
      done();
    }, done.fail);
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing user', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(
      new HttpResponse({
        status: 200,
      })
    );

    service.deleteUser(1).subscribe((response) => {
      // expect(response.status).toEqual(200);
      done();
    }, done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('should return a 404', (done: DoneFn) => {
    var userId = 89776683;

    httpSpy.get.and.throwWith(
      new HttpErrorResponse({
        error: '404 - Not Found',
        status: 404,
      })
    );

    service.getUser(userId).subscribe(
      (customer) => {
        done.fail('Expected a 404');
      },
      (error) => {
        expect(error.status).toEqual(404);
        done();
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
