import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { SearchService } from '../core/services/search.service';

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
    private ss: SearchService,
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

    this.ss.savedPage = -3;
    if (this.ahs.isLoggedIn) {
      this.idArray = await this.ss.getIdArray();
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

  async randomIdWithFilter(): Promise<void> {

    const filter = this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1).toLowerCase();

    this.ss.savedPage = -3;
    if (this.ahs.isLoggedIn) {

      if (filter) {
        this.idArray = await this.ss.getIdArrayWithFilter(filter);
        length = this.idArray.length;

        if (length == 0) {
          this.router.navigate(['/']);
          console.log("elso")
        } else if (length == 1) {
          this.router.navigate(['/accommodations/' + this.idArray[0]]);
          console.log("masodik")
        } else {
          let x = Math.floor(Math.random() * length);
          while (this.random == x) {
            x = Math.floor(Math.random() * length);
          }
          this.random = x;
          this.router.navigate(['/accommodations/' + this.idArray[x]]);
          console.log("harmadik")
        }

      } else {
        this.ns.showNotification(1, "Adjon meg egy úticélt", 1200);
      }
    } else {
      this.ns.showNotification(1, "Bejelentkezés szükséges", 1200);
    }
    this.clearSearch();
  }

}
