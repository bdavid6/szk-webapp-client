import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationService } from '../core/services/accommodation.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filterText: string = '';

  random!: number;

  constructor(
    private as: AccommodationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clearSearch() {
    this.filterText = '';
  }

  randomId(): void {
    if (this.as.getAccommodationsLength() == 0) {
      this.router.navigate(['/accommodations']);
    } else if (this.as.getAccommodationsLength() == 1) {
      this.router.navigate(['/accommodations/id/' + 1]);
    } else {
      let x = Math.floor((Math.random() * this.as.getAccommodationsLength()) + 1);
      while (this.random == x) {
        x = Math.floor((Math.random() * this.as.getAccommodationsLength()) + 1);
      }
      this.random = x;
      this.router.navigate(['/accommodations/id/' + x]);
    }
  }


}
