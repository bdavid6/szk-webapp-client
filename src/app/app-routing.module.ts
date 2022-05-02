import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { ReservedAccommodationsComponent } from './reserved-accommodations/reserved-accommodations.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: AccommodationsComponent},
  {path: 'accommodations/:accommodationId', component: AccommodationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'new-accommodation', component: CreateAccommodationComponent, canActivate: [AuthGuard]},
  {path: 'reserved-accommodations', component: ReservedAccommodationsComponent, canActivate: [AuthGuard]},
  {path: 'information', component: InformationComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
