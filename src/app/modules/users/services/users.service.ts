import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '@environs';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

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

  getUsers(): Observable<User[]> {
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
