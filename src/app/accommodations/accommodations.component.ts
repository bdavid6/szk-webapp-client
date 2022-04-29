import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../core/interfaces/accommodation';
import { Tag } from '../core/interfaces/tag';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {

  accommodations!: Accommodation[];

  constructor(
    private as: AccommodationService,
  ) { }

  ngOnInit(): void {
    this.accommodations = this.as.getAccommodations();
  }
}
