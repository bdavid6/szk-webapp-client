import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../core/interfaces/accommodation';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {

  accommodations: Accommodation[] = [
    {
      name: 'Valami Hotel',
      place: 'Budapest',
      label: 'Valamiféle leirás',
      mainImage: "/assets/img/noimage.png",
    }, {
      name: 'Szálloda Hatvan',
      place: 'Hatvan',
      label: 'Kis város',
      mainImage: "/assets/img/bg.jpg",
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
