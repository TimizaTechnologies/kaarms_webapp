import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Review } from '@modules/reviews/models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Student
  AddStudent(student: Review) {
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
  UpdateStudent(student: Review) {
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
}
