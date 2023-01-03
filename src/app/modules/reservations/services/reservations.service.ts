import { Injectable } from '@angular/core';
import { environment } from '@environs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';
import { Reservation } from '@modules/reservations/models/reservation.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private reservationUrl = `${environment.apiUrl}reservations`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http
      .post<Reservation>(this.reservationUrl, reservation)
      .pipe(catchError(this.eh.handleError));
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http
      .get<Reservation>(`${this.reservationUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(`${this.reservationUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateReservation(
    id: number,
    asset: Partial<Reservation>
  ): Observable<Reservation> {
    return this.http
      .patch<Reservation>(`${this.reservationUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteReservation(id: number): Observable<Reservation> {
    return this.http
      .delete<Reservation>(`${this.reservationUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
