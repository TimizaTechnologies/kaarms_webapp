import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "@modules/properties/models/property.model";
import {MatPaginator} from "@angular/material/paginator";
import {PropertiesService} from "@modules/properties/services/properties.service";

/**
 * Property listings: Allow property owners to list their rentals and include details such as location, size, price, and available dates.
 */
@Component({
  selector: 'app-list-properties',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    '$key',
    'book_name',
    'author_name',
    'publication_date',
    'in_stock',
    'action',
  ];
  constructor(private bookApi: PropertiesService) {
    this.bookApi
      .GetBookList()
      .snapshotChanges()
      .subscribe((books) => {
        books.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BookData.push(a as Book);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BookData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }
  /* Delete */
  deleteBook(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.bookApi.DeleteBook(e.$key);
    }
  }
}
