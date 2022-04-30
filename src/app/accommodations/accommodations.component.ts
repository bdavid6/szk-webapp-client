import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Accommodation } from '../core/interfaces/accommodation';
import { Tag } from '../core/interfaces/tag';
import { AccommodationService } from '../core/services/accommodation.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {

  accommodations!: Promise<Accommodation[]>;

  page = 1;

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
    
  ) {
    //setTimeout(() => {
      route.paramMap.subscribe(params => {
        const filterText = params.get('filterText')!;
        this.accommodations = this.as.getAccommodations(this.page);
      })
    //}, 300);
  }

  ngOnInit(): void {
  }

  getPageData(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.accommodations = this.as.getAccommodations(this.page);
    window.scrollTo(0, 0);
  }
}
