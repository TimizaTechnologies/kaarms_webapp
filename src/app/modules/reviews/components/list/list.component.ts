import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tenant } from '@modules/tenants/models/tenant.model';
import { ReviewsService } from '@modules/reviews/services/reviews.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  p = 1;
  Student: Tenant[];
  hideWhenNoStudent = false;
  noData = false;
  preLoader = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  min: any = 0;
  max: any = 0;

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

    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
    };

    /*$.fn.dataTable.ext.search.push((settings: any, data: string[], dataIndex: any) => {
      const id = parseFloat(data[0]) || 0; // use data for the id column
      return (Number.isNaN(this.min) && Number.isNaN(this.max)) ||
          (Number.isNaN(this.min) && id <= this.max) ||
          (this.min <= id && Number.isNaN(this.max)) ||
          (this.min <= id && id <= this.max);
    });*/
  }

  getReviews() {
    /*
    this.service
      .users()
      .subscribe((response: any) => {
        this.allUsers = response;
        // initiate our data table
        this.dtTrigger.next();
      });
      */
  }

  filterById(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn.dataTable.ext.search.pop();
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
