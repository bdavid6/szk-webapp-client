import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filterText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  clearSearch() {
    this.filterText = '';
  }
}
