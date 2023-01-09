import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environs';
import { Property } from '@modules/properties/models/property.model';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private propertyUrl = `${environment.apiUrl}properties`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

  /* Create property */
  createProperty(property: Property): Observable<Property> {
    return this.http
      .post<Property>(this.propertyUrl, property)
      .pipe(catchError(this.eh.handleError));
  }

  /* Get property */
  getProperty(id: number): Observable<Property> {
    return this.http
      .get<Property>(`${this.propertyUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  /* Get property list */
  // getPropertys(): Observable<Property[]> {
  getProperties(): any {
    return this.http
      .get<Property[]>(`${this.propertyUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  /* Update book */
  updateProperty(id: number, asset: Partial<Property>): Observable<Property> {
    return this.http
      .patch<Property>(`${this.propertyUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  /* Delete property */
  deleteProperty(id: number): Observable<Property> {
    return this.http
      .delete<Property>(`${this.propertyUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
