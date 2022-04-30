import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { Tag } from '../core/interfaces/tag';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {

  accommodations!: Promise<Accommodation[]>;

  constructor(
    private as: AccommodationService,
    private route: ActivatedRoute,
  ) {
    route.paramMap.subscribe(params => {
      const filterText = params.get('filterText')!;
      this.accommodations = this.as.getAccommodations(filterText);
    })
  }

  ngOnInit(): void {

  }
}
