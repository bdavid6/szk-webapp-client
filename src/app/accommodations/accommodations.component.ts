import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

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
    private router: Router,
    private ns: NotificationService
    
  ) {
    //setTimeout(() => {
      this.route.queryParams
      .subscribe(async params => {
        this.filterText = params.filter;
        this.page = params.page;
        this.accommodations = this.as.getAccommodations(this.page, this.filterText);
        if((await this.accommodations).length == 0) {
          this.router.navigate(['/']);
          this.ns.showNotification(1, "Nem található ilyen szállás", 1200);
        } else {
          this.setPaginator();
        }
        //setTimeout(() => {this.resetPaginator();}, 200);
      }
      );
    //}, 300);
  }

  ngOnInit(): void {
  }

  setPaginator(): void {
    if(this.as.savedPage == -1) {
      this.paginator.pageIndex = this.page -1;
      this.as.savedPage = -2;
    } else {
      if(this.page == 1) {
        this.paginator.firstPage();
      }
    }
  }

  saveUrl(): void {
    this.as.savedPage = this.page;
    if(this.filterText) {
      this.as.savedFilter = this.filterText;
    }
  }

  getPageData(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.router.navigate(['/search'],{queryParams: {filter: this.filterText, page: this.page}})
    window.scrollTo(0, 0);
  }
}
