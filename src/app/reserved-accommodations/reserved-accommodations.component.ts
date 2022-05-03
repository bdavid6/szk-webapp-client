import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from '../core/interfaces/accommodation';
import { AccommodationService } from '../core/services/accommodation.service';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-reserved-accommodations',
  templateUrl: './reserved-accommodations.component.html',
  styleUrls: ['./reserved-accommodations.component.scss']
})
export class ReservedAccommodationsComponent implements OnInit {

  accommodations!: Promise<Accommodation[]>;

  constructor(
    public as: AccommodationService,
    private router: Router,
  ) {
    this.accommodations = this.as.getReservedAccommodations();
  }

  ngOnInit(): void {
  }

  async resignSubmit(id: number): Promise<void> {
    await this.as.deleteReservationByAccommodation(id);

    //reload page
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
