import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Role, User } from '../models/user.model';
import { environment } from '@environs';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userUrl = `${environment.apiUrl}users`;

  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  isUserLoggedIn$ = this.user$.pipe(map(Boolean));
  isAdmin$ = this.user$.pipe(map(user => user?.isAdmin));

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

  hasAnyRole = (role: Role | Role[]) =>
    this.user$.pipe(
      map(user => {
        if (user?.isAdmin) return true;

        const roles: Role[] = Array.isArray(role) ? role : [role];
        return roles.length === 0 || user?.roles.some(r => roles.includes(r));
      })
    );

  add(user: User) {
    this.user.next(user);
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl, user)
      .pipe(catchError(this.eh.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  // getUsers(): Observable<User[]> {
  getUsers(): any {
    return this.http
      .get<User[]>(`${this.userUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateUser(id: number, asset: Partial<User>): Observable<User> {
    return this.http
      .patch<User>(`${this.userUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteUser(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.userUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
