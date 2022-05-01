import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation } from '../interfaces/accommodation';
import { Reservation } from '../interfaces/reservation';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodations: Accommodation[] = [];

  private idArray: number[] = [];

  public countAccommodations!: number;

  private reservations: Reservation[] = [];

  constructor(
    private ns: NotificationService,
    private http: HttpClient
  ) { }

  async getAccommodations(page: number): Promise<Accommodation[]> {
    this.accommodations = await this.http.get('/api/search/all').toPromise()
    .catch((error: any) => {
      console.log(error);
    }) as Accommodation[];

    this.countAccommodations = 0;
    let x = 0
    for (let i = 0; i < this.accommodations.length; i++) {
      x++;
    }
    this.countAccommodations = x;

    this.accommodations = await this.http.get('/api/search/' + page).toPromise()
    .catch((error: any) => {
      console.log(error);
    }) as Accommodation[];

    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }
    return this.accommodations;
  }

  async getFilteredAccommodations(page: number, filterText: string): Promise<Accommodation[]> {
    const modifiedFilterText = filterText.charAt(0).toUpperCase() + filterText.slice(1).toLowerCase();
    this.accommodations = await this.http.get('/api/search/filter/'+ modifiedFilterText +'/all').toPromise()
    .catch((error: any) => {
      console.log(error);
    }) as Accommodation[];

    this.countAccommodations = 0;
    let x = 0
    for (let i = 0; i < this.accommodations.length; i++) {
      x++;
    }
    this.countAccommodations = x;

    this.accommodations = await this.http.get('/api/search/filter/'+ modifiedFilterText + '/' + page).toPromise() as Accommodation[];
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

  async getAccommodation(accommodationId: number): Promise<Accommodation> {
    return (await this.http.get('/api/accommodations/' + accommodationId).toPromise()
    .catch((error: any) => {
      console.log(error);
    }) as Accommodation);
  }

  async getIdArray(): Promise<number[]> {
    this.accommodations = await this.http.get('/api/search/all').toPromise()
    .catch((error: any) => {
      console.log(error);
    }) as Accommodation[];

    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }
    return this.idArray;
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

