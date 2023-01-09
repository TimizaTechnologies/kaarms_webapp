import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Property } from '@modules/properties/models/property.model';
import { MatPaginator } from '@angular/material/paginator';
import { PropertiesService } from '@modules/properties/services/properties.service';

/**
 * Property listings: Allow property owners to list their rentals and include details such as location, size, price, and available dates.
 */
@Component({
  selector: 'app-list-properties',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  dataSource: MatTableDataSource<Property>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  properties: any = [];
  displayedColumns: any[] = [
    'id',
    'logo',
    'name',
    'description',
    'price',
    'size',
    'action',
  ];

  constructor(private propertiesService: PropertiesService) {
    this.propertiesService.getProperties().subscribe(properties => {
      this.properties = properties.results;
      /* Data table */
      this.dataSource = new MatTableDataSource(this.properties);
      /* Pagination */
      setTimeout(() => {
        // this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  /* Delete */
  deleteProperty(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        // this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.propertiesService.deleteProperty(e.id);
    }
  }
}
