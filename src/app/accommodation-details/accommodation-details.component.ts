import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent implements OnInit {

  accommodation?: Accommodation;

  constructor(
    private as: AccommodationService,
    private route: ActivatedRoute,
  ) {
      this.route.paramMap.subscribe(async params => {
        const accommodationId = parseInt(params.get('accommodationId')!);
        this.accommodation = await this.as.getAccommodation(accommodationId);
      })
  }

  ngOnInit(): void {

    /*this.route.paramMap.subscribe(async params => {
      const accommodationId = parseInt(params.get('accommodationId')!);
      this.accommodationId = accommodationId;
      this.accommodation = await this.as.getAccommodation(this.accommodationId);
    })*/
  }
}
