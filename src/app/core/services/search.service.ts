import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation } from '../interfaces/accommodation';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private accommodations: Accommodation[] = [];

  private idArray: number[] = [];

  public countAccommodations!: number;

  public savedPage!: number;

  public savedFilter!: string;

  constructor(
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

}


