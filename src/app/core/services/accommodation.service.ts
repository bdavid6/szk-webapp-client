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

  public savedPage!: number;

  public savedFilter!: string;


  constructor(
    private ns: NotificationService,
    private http: HttpClient
  ) { }

  async getAccommodations(page: number, filterText: string): Promise<Accommodation[]> {
    if (filterText) {
      //paginatorhoz megszámolni az összes találatot
      const modifiedFilterText = filterText.charAt(0).toUpperCase() + filterText.slice(1).toLowerCase();
      this.accommodations = await this.http.get('/api/search',
        {
          params: {
            filter: modifiedFilterText
          },
        }).toPromise()
        .catch((error: any) => {
          console.log(error);
        }) as Accommodation[];

      this.countAccommodations = 0;
      let x = 0
      for (let i = 0; i < this.accommodations.length; i++) {
        x++;
      }
      this.countAccommodations = x;

      //konkrét lekérdezés
      this.accommodations = await this.http.get('/api/search',
        {
          params: {
            filter: modifiedFilterText,
            page: page
          },
        }).toPromise() as Accommodation[];

      //találatok id-ja feltöltése egy arraybe, a "random választáshoz kell"
      this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);
      }
    } else {
      //ugyanazt csinálja mint fentebb, csak filter nélkül
      this.accommodations = await this.http.get('/api/search').toPromise()
        .catch((error: any) => {
          console.log(error);
        }) as Accommodation[];

      this.countAccommodations = 0;
      let x = 0
      for (let i = 0; i < this.accommodations.length; i++) {
        x++;
      }
      this.countAccommodations = x;

      this.accommodations = await this.http.get('/api/search',
        {
          params: {
            page: page
          },
        }).toPromise()
        .catch((error: any) => {
          console.log(error);
        }) as Accommodation[];

      this.idArray = [];
      for (let i = 0; i < this.accommodations.length; i++) {
        this.idArray.push(this.accommodations[i].id);
      }
    }
    return this.accommodations;
  }

  async getAccommodation(accommodationId: number): Promise<Accommodation> {
    return (await this.http.get('/api/accommodations/' + accommodationId).toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation);
  }

  async getIdArray(): Promise<number[]> {
    this.accommodations = await this.http.get('/api/search').toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation[];

    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }
    return this.idArray;
  }

  async getIdArrayWithFilter(filterText: string): Promise<number[]> {
    this.accommodations = await this.http.get('/api/search',
    {
      params: {
        filter: filterText,
      },
    }).toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation[];

    this.idArray = [];
    for (let i = 0; i < this.accommodations.length; i++) {
      this.idArray.push(this.accommodations[i].id);
    }
    return this.idArray;
  }

  async createAccommodation(accommodation: Accommodation): Promise<Accommodation> {
    return (await this.http
      .post('/api/accommodations', accommodation)
      .toPromise()
      .catch((error: any) => {
        console.log(error);
      })) as Accommodation;
  }

  getReservations(): Reservation[] {
    return this.reservations;
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

  async deleteReservation(accommodationId: number): Promise<void> {
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

    this.accommodations = await this.http.get('/api/accommodations').toPromise()
      .catch((error: any) => {
        console.log(error);
      }) as Accommodation[];

    return this.accommodations;
  }
}


