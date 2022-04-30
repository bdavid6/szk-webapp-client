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

  public idArray: number[] = [];

  public allAccommodations!: number;

  private reservations: Reservation[] = [];

  constructor(
    private router: Router,
    private ns: NotificationService,
    private http: HttpClient
  ) { }

  get getIdArray(): number[] {
    return this.idArray;
  }

  async getAccommodations(filterText: number): Promise<Accommodation[]> {
    this.accommodations = await this.http.get('/api/search/all').toPromise() as Accommodation[];
    this.allAccommodations = 0;
    let x = 0
    for (let i = 0; i < this.accommodations.length; i++) {
      x++;
    }
    this.allAccommodations = x;
    console.log(this.allAccommodations)

    this.accommodations = await this.http.get('/api/search/' + filterText).toPromise() as Accommodation[];
    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }


    /*if (this.accommodations.length == 0) {
      this.accommodations = await this.http.get('/api/search/1').toPromise() as Accommodation[];
      this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);
      }

    }*/
    return this.accommodations;
  }

  /*async getAccommodations(filterText: string): Promise<Accommodation[]> {
    this.accommodations = await this.http.get('/api/search/filter/' + filterText).toPromise() as Accommodation[];

    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }

    if (this.accommodations.length == 0) {
      this.accommodations = await this.http.get('/api/search/').toPromise() as Accommodation[];
      this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);
      }
    }
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

