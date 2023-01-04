import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { environment } from '@environs';
import { Book, Property } from '@modules/properties/models/property.model';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;
  private propertyUrl = `${environment.apiUrl}properties`;

  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandler,
    private db: AngularFireDatabase
  ) {}

  /* Create book */
  AddBook(book: Book) {
    this.booksRef
      .push({
        book_name: book.book_name,
        isbn_10: book.isbn_10,
        author_name: book.author_name,
        publication_date: book.publication_date,
        binding_type: book.binding_type,
        in_stock: book.in_stock,
        languages: book.languages,
      })
      .catch(error => {
        this.errorMgmt(error);
      });
  }
  /* Get book */
  GetBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    return this.bookRef;
  }
  /* Get book list */
  GetBookList() {
    this.booksRef = this.db.list('books-list');
    return this.booksRef;
  }
  /* Update book */
  UpdateBook(id, book: Book) {
    this.bookRef
      .update({
        book_name: book.book_name,
        isbn_10: book.isbn_10,
        author_name: book.author_name,
        publication_date: book.publication_date,
        binding_type: book.binding_type,
        in_stock: book.in_stock,
        languages: book.languages,
      })
      .catch(error => {
        this.errorMgmt(error);
      });
  }
  /* Delete book */
  DeleteBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    this.bookRef.remove().catch(error => {
      this.errorMgmt(error);
    });
  }
  // Error management
  private errorMgmt(error) {
    console.log(error);
  }

  createProperty(property: Property): Observable<Property> {
    return this.http
      .post<Property>(this.propertyUrl, property)
      .pipe(catchError(this.eh.handleError));
  }

  getProperty(id: number): Observable<Property> {
    return this.http
      .get<Property>(`${this.propertyUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  // getPropertys(): Observable<Property[]> {
  getProperties(): any {
    return this.http
      .get<Property[]>(`${this.propertyUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateProperty(id: number, asset: Partial<Property>): Observable<Property> {
    return this.http
      .patch<Property>(`${this.propertyUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteProperty(id: number): Observable<Property> {
    return this.http
      .delete<Property>(`${this.propertyUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
