import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.scss']
})
export class CreateAccommodationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(e: any): void {
    console.log(e);
    e.preventDefault();
  }
}
