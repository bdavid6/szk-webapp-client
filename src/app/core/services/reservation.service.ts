import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Accommodation } from '../interfaces/accommodation';
import { User } from '../interfaces/user';

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

  constructor(
    private http: HttpClient
  ) { }

  async reservation(reservationRequest: ReservationRequest, id: number): Promise<void> {
    const reservation = await this.http
      .post<ReservationRequest>('/api/accommodations/'+ id, reservationRequest)
      .toPromise();
  }
}
