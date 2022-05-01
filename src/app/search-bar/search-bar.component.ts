import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationService } from '../core/services/accommodation.service';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchText: string = '';

  random!: number;

  private idArray: number[] = [];

  constructor(
    private as: AccommodationService,
    private ahs: AuthService,
    private ns: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formatSearchText(): string {
    return this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1).toLowerCase();
  }

  clearSearch() {
    this.searchText = '';
  }

  async randomId(): Promise<void> {

    if (this.ahs.isLoggedIn) {
      this.idArray = await this.as.getIdArray();
      length = this.idArray.length;

      if (length == 0) {
        this.router.navigate(['/']);

      } else if (length == 1) {
        this.router.navigate(['/accommodations/' + this.idArray[0]]);

      } else {
        let x = Math.floor(Math.random() * length);
        while (this.random == x) {
          x = Math.floor(Math.random() * length);
        }
        this.random = x;
        this.router.navigate(['/accommodations/' + this.idArray[x]]);
      }

    } else {
      this.ns.showNotification(1, "Bejelentkezés szükséges", 1200);
    }
  }


}
