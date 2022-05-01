import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { FilterAccommodationsComponent } from './filter-accommodations/filter-accommodations.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/filter/:filterText/:pageId', component: FilterAccommodationsComponent},
  {path: 'search/:pageId', component: AccommodationsComponent},
  {path: 'accommodations/:accommodationId', component: AccommodationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'new-accommodation', component: CreateAccommodationComponent, canActivate: [AuthGuard]},
  {path: 'information', component: InformationComponent},
  {path: 'auth', component: AuthComponent},
  /*{path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},*/
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
