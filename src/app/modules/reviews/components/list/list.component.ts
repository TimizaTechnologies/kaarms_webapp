import { Component, OnInit } from '@angular/core';
import { Tenant } from '@modules/tenants/models/tenant.model';
import { ReviewsService } from '@modules/reviews/services/reviews.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  p = 1;
  Student: Tenant[];
  hideWhenNoStudent = false;
  noData = false;
  preLoader = true;

  constructor(public crudApi: ReviewsService, public toastr: ToastrService) {}

  ngOnInit() {
    this.dataState();
    const s = this.crudApi.GetStudentsList();
    s.snapshotChanges().subscribe(data => {
      this.Student = [];
      data.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Student.push(a as Tenant);
      });
    });
  }

  dataState() {
    this.crudApi
      .GetStudentsList()
      .valueChanges()
      .subscribe(data => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoStudent = false;
          this.noData = true;
        } else {
          this.hideWhenNoStudent = true;
          this.noData = false;
        }
      });
  }

  deleteStudent(student) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.crudApi.DeleteStudent(student.$key);
      this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }
}
