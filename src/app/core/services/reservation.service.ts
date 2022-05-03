import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Accommodation } from '../interfaces/accommodation';
import { User } from '../interfaces/user';
import { Reservation } from '../interfaces/reservation';
import { NotificationService } from './notification.service';

export interface ReservationRequest {
  start_date: string;
  end_date: string;
  user: User;
  accommodation: Accommodation;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //public reservations: Reservation[] = [];

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) { }

  async reservation(reservationRequest: ReservationRequest, id: number): Promise<void> {
    const reservation = await this.http
      .post<ReservationRequest>('/api/accommodations/' + id, reservationRequest)
      .toPromise();
  }

  async deleteReservation(reservationId: number): Promise<void> {
    await this.http.delete('/api/reservations/' + reservationId).toPromise()
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

  async getReservationsByAccommodation(accommodationId: number): Promise<Reservation[]> {
    const reservations = await this.http.get('/api/reservations/accommodation/' + accommodationId).toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Reservation[];

    return reservations;
  }

}
