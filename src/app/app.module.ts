import { GeoCoord } from './variablesGlobales';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StationComponent } from './station/station.component';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { FormsModule } from '@angular/forms';
import { CommerceComponent } from './commerce/commerce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSliderModule} from '@angular/material';

const appRoutes: Routes = [
  {
    path: 'stations',
    component: StationComponent,
    data: { title: 'Station List' }
  },
  {
    path: 'station-details',
    component: StationDetailComponent,
    data: { title: 'Station Details' }
  },
  {
    path: 'commerces',
    component: CommerceComponent,
    data: { title: 'Commerce List' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationDetailComponent,
    CommerceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule
  ],
  providers: [
    GeoCoord
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
