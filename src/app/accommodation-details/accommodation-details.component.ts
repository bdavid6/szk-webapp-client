import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { Reservation } from '../core/interfaces/reservation';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent implements OnInit {

  accommodation?: Accommodation;

  currentPage!: number;

  constructor(
    public as: AccommodationService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(async params => {
      const accommodationId = parseInt(params.get('accommodationId')!);
      this.accommodation = await this.as.getAccommodation(accommodationId);
    })
    this.currentPage = as.savedPage;
  }

  ngOnInit(): void {

    /*this.route.paramMap.subscribe(async params => {
      const accommodationId = parseInt(params.get('accommodationId')!);
      this.accommodationId = accommodationId;
      this.accommodation = await this.as.getAccommodation(this.accommodationId);
    })*/
  }

  resetUrl(): void {
    this.as.savedPage = -1;
    this.as.savedFilter = '';
  }


  async submitReserve(): Promise<void> {

    await this.as.reserveAccommodation('elso', 'masodik', this.accommodation!.id);
  }

}
