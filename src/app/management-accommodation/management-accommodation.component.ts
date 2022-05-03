import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { Reservation } from '../core/interfaces/reservation';
import { AccommodationService } from '../core/services/accommodation.service';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-management-accommodation',
  templateUrl: './management-accommodation.component.html',
  styleUrls: ['./management-accommodation.component.scss']
})
export class ManagementAccommodationComponent implements OnInit {

  accommodations!: Promise<Accommodation[]>;

  reservations!: Promise<Reservation[]>;

  selectedId!: number;

  statusControl = new FormControl('', Validators.required);

  constructor(
    private as: AccommodationService,
    private rs: ReservationService,
    private router: Router
  ) {
    this.accommodations = this.as.getMyAccommodations();
  }

  ngOnInit(): void {

  }

  onChange(selectedItem: any): void {
    this.reservations = this.rs.getReservationsByAccommodation(selectedItem.id);
    this.selectedId = selectedItem.id;
    //setTimeout(() => {this.resetPaginator();}, 200);
  }

  /*async onChange(selectedItem: any): Promise<void> {
    this.reservations = this.rs.getReservationsByAccommodation(selectedItem.id);
  }*/

  async deleteSubmit(reservationId: number): Promise<void> {
    await this.rs.deleteReservation(reservationId);
    this.reservations = this.rs.getReservationsByAccommodation(this.selectedId);
  }

  async changeStatus(accommodationId: number): Promise<void> {
    await this.as.changeStatus(accommodationId);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
