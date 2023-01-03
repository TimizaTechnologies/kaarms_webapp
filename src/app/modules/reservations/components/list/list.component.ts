import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { Reservation } from '@modules/reservations/models/reservation.model';
import { EditComponent } from '../edit/edit.component';

/**
 * Online reservations: Allow users to browse available rentals and make reservations online, including the ability to pay for the rental through the app or website.
 */
@Component({
  selector: 'app-list-reservations',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  items: any[];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<Reservation>;

  constructor(
    private myService: ReservationsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.myService.getReservations().subscribe(data => {
      this.items = data;
    });

    this.myService.getReservations().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: { id: 0 },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  delete(id: number) {
    this.myService.deleteReservation(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  /*delete(id: number) {
    this.myService.deleteReservation(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }*/
}
