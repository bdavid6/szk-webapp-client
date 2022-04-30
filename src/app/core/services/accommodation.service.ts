import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../interfaces/accommodation';
import { Reservation } from '../interfaces/reservation';
import { Tag } from '../interfaces/tag';
import { Role } from '../interfaces/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodations: Accommodation[] = [];

  private reservations: Reservation[] = [];

  constructor(
    private router: Router,
    private ns: NotificationService,
    private httpClient: HttpClient
  ) { }

  getAccommodations(filterText: string): Accommodation[] {

    if (!!filterText) {
      if (this.accommodations.find((accommodation) => accommodation.place === filterText)!) {
        const filteredArray = this.accommodations.filter(accommodation => accommodation.place === filterText).map(accommodation => accommodation);
        this.ns.showNotification(0, "Sikeres keresés.", 1200);
        return filteredArray;
      } else {
        this.router.navigate(['accommodations']);
        this.ns.showNotification(1, "ÁTIRÁNYÍTVA:\u00A0\u00A0 Nem találtunk megfelelő szállást.", 2500);
        return this.accommodations;
      }
    } else {
      return this.accommodations;
    }
  }

  /*if(this.accommodations.find((accommodation) => accommodation.place === filterText)!) {
    console.log("kek")
  } else {
    this.router.navigate(['information']);
    this.ns.showNotification(0, "ÁTIRÁNYÍTVA: Nem találtunk megfelelő szállást", 2500);
  }

  if (!!filterText) {
    const filteredArray = this.accommodations.filter(accommodation => accommodation.place === filterText).map(accommodation => accommodation);
    return filteredArray;
  } else {
    return this.accommodations;
  }*/

  getAccommodation(accommodationId: number): Accommodation {
    return this.accommodations.find((accommodation) => accommodation.id === accommodationId)!;
  }

  createAccommodation(accommodation: Accommodation): void {
    this.accommodations.push(accommodation);
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getAccommodationsLength(): number {
    return this.accommodations.length;
  }

  /*async reserveAccommodation(start: string, end: string): Promise<Reservation> {
    const createdReservation = await this.httpClient
      .post<Reservation>(`/api/accommodations/${accommodation.id}`, { startDate: start, endDate: end })
      .toPromise();
    return createdReservation;
  }*/

  reserveAccommodation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }
}

