import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../interfaces/accommodation';
import { Reservation } from '../interfaces/reservation';
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
    private http: HttpClient
  ) { }

  async getAccommodations(filterText: string): Promise<Accommodation[]> {
    this.accommodations = await this.http.get('/api/accommodations/'+filterText).toPromise() as Accommodation[];

    if(this.accommodations.length == 0) {
      return await this.http.get('/api/accommodations/').toPromise() as Accommodation[];
    } else {
      return this.accommodations;
    }
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

