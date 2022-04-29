import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'accommodations', component: AccommodationsComponent},
  {path: 'accommodations/:accommodationId', component: AccommodationDetailsComponent},
  {path: 'new-accommodation', component: CreateAccommodationComponent},
  {path: 'information', component: InformationComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
