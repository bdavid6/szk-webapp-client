import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.ahs.isLoggedIn;
  }

  constructor(
    private ahs: AuthService
  ) { }

  ngOnInit(): void {
  }

}
