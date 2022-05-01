import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-filter-accommodations',
  templateUrl: './filter-accommodations.component.html',
  styleUrls: ['./filter-accommodations.component.scss']
})
export class FilterAccommodationsComponent implements OnInit {

  accommodations!: Promise<Accommodation[]>;

  page = 1;

  filterText = '';

  get isLoggedIn(): boolean {
    return this.ahs.isLoggedIn;
  }

  get isAdmin(): boolean {
    return this.ahs.isAdmin;
  }

  constructor(
    public as: AccommodationService,
    private ahs: AuthService,
    private route: ActivatedRoute,
    private router: Router
    
  ) {
    //setTimeout(() => {
      route.paramMap.subscribe(params => {
        const filterText = params.get('filterText')!;
        this.filterText = filterText;
        this.accommodations = this.as.getFilteredAccommodations(this.page, this.filterText);
      })
    //}, 300);
  }

  ngOnInit(): void {
  }

  getPageData(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.router.navigate(["/search/filter/" + this.filterText + '/' + this.page])
    window.scrollTo(0, 0);
  }

}
