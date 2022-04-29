import { Injectable } from '@angular/core';
import { Accommodation } from '../interfaces/accommodation';
import { Reservation } from '../interfaces/reservation';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodations: Accommodation[] = [
    {
      id: 1,
      name: 'Valami Hotel',
      place: 'Budapest',
      label: 'Valamiféle leirás',
      mainImage: "/assets/img/noimage.png",
    }, {
      id: 2,
      name: 'Szálloda Hatvan',
      place: '60+1-1',
      label: 'Kis város',
      mainImage: "/assets/img/bg.jpg",
    },
  ];

  private reservations: Reservation[] = [];

  constructor() { }

  getAccommodations(): Accommodation[] {
    return this.accommodations;
  }

  getAccommodation(accommodationId: number): Accommodation {
    return this.accommodations.find((accommodation) => accommodation.id === accommodationId)!;
  }
  
  createAccommodation(accommodation: Accommodation): void {
    this.accommodations.push(accommodation);
  }

  getReservations(): Reservation[] {
    return this.reservations;
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

