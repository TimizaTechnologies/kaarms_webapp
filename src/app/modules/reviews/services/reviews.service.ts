import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { environment } from '@environs';
import { Review } from '@modules/reviews/models/review.model';
import { Student } from '@modules/reviews/models/review.model';
import { HttpErrorHandler } from '@shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  private reviewUrl = `${environment.apiUrl}reviews`;

  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandler,
    private db: AngularFireDatabase
  ) {}

  // Create Student
  AddStudent(student: Student) {
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber,
    });
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }

  // Update Student Object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber,
    });
  }

  // Delete Student Object
  DeleteStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    this.studentRef.remove();
  }

  createReview(review: Review): Observable<Review> {
    return this.http
      .post<Review>(this.reviewUrl, review)
      .pipe(catchError(this.eh.handleError));
  }

  getReview(id: number): Observable<Review> {
    return this.http
      .get<Review>(`${this.reviewUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  // getReviews(): Observable<Review[]> {
  getReviews(): any {
    return this.http
      .get<Review[]>(`${this.reviewUrl}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateReview(id: number, asset: Partial<Review>): Observable<Review> {
    return this.http
      .patch<Review>(`${this.reviewUrl}/${id}`, asset)
      .pipe(catchError(this.eh.handleError));
  }

  deleteReview(id: number): Observable<Review> {
    return this.http
      .delete<Review>(`${this.reviewUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
