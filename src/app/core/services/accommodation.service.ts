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

  constructor(
    private ns: NotificationService,
    private http: HttpClient
  ) { }

  async getAccommodation(accommodationId: number): Promise<Accommodation> {
    return (await this.http.get('/api/accommodations/' + accommodationId).toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation);
  }

  async createAccommodation(accommodation: Accommodation): Promise<Accommodation> {
    return (await this.http
      .post('/api/accommodations', accommodation)
      .toPromise()
      .catch((error: any) => {
        console.log(error);
      })) as Accommodation;
  }

  getAccommodationsLength(): number {
    return this.accommodations.length;
  }

  async reserveAccommodation(start: string, end: string, accommodationId: number): Promise<void> {
    await this.http
      .post<Reservation>('/api/accommodations/' + accommodationId, { start_date: start, end_date: end })
      .toPromise()
      .catch((error: any) => {

        if (error.status == 409) {
          console.log(error);
          this.ns.showNotification(1, "Már le van foglalva egy időpont", 1200);
        } else if(error.status == 405) {
          this.ns.showNotification(1, "A saját szállásod nem foglalhatod le", 1200);
        } else {
          this.ns.showNotification(0, "Sikeres foglalás", 1200);
        }
      },
      );
  }

  async deleteReservationByAccommodation(accommodationId: number): Promise<void> {
    await this.http.delete('/api/accommodations/' + accommodationId).toPromise()
    /*await this.http
      .delete<Reservation>('/api/accommodations/' + accommodationId)
      .toPromise()*/
      .catch((error: any) => {

        if (error.status == 409) {
          console.log(error);
          this.ns.showNotification(1, "Nem sikerült a lemondás", 1200);
        } else {
          this.ns.showNotification(0, "Sikeres lemondás", 1200);
        }
      },
      );
  }

  async getReservedAccommodations(): Promise<Accommodation[]> {

    this.accommodations = await this.http.get('/api/reservations').toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation[];

    return this.accommodations;
  }

  async getMyAccommodations(): Promise<Accommodation[]> {

    this.accommodations = await this.http.get('/api/accommodations').toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation[];

    return this.accommodations;
  }

  async changeStatus(accommodationId: number): Promise<void> {
    await this.http.put('/api/accommodations/' + accommodationId, '').toPromise()
      .catch((error: any) => {

        if (error.status == 409) {
          console.log(error);
          this.ns.showNotification(1, "Nem sikerült a változtatás", 1200);
        } else {
          this.ns.showNotification(0, "Sikeres státusz változtatás", 1200);
        }
      },
      );
  }
}


