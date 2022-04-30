import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'accommodations', component: AccommodationsComponent},
  {path: 'accommodations/id/:accommodationId', component: AccommodationDetailsComponent},
  {path: 'accommodations/:filterText', component: AccommodationsComponent},
  {path: 'new-accommodation', component: CreateAccommodationComponent, canActivate: [AuthGuard]},
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
