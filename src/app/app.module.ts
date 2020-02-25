import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { FormsModule } from '@angular/forms';
import { CommerceComponent } from './commerce/commerce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSliderModule, MatSelectModule, MatInputModule, MatAutocompleteModule, MatCardModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MypositionComponent } from './myposition/myposition.component';
import { SiteComponent } from './site/site.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { HomepageComponent } from './homepage/homepage.component';
import { SanissetteComponent } from './sanissette/sanissette.component';
const appRoutes: Routes = [
  {
    path: 'station-details',
    component: StationDetailComponent,
    data: { title: 'Station Details' }
  },
  {
    path: 'commerces',
    component: CommerceComponent,
    data: { title: 'Commerce List' }
  },
  {
    path: 'myposition',
    component: MypositionComponent,
    data: { title: 'My position' }
  },
  {
    path: 'autres-sites',
    component: SiteComponent,
    data: { title: 'Autres sites' }
  },
  {
    path: 'contacts',
    component: ContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'About us' }
  },
  {
    path: '',
    component: HomepageComponent,
    data: { title: 'Home page' }
  },
  {
    path: 'Sanissette',
    component: SanissetteComponent,
    data: { title: 'Others' }
  }


];

@NgModule({
  declarations: [
    AppComponent,
    StationDetailComponent,
    CommerceComponent,
    MypositionComponent,
    SiteComponent,
    ContactComponent,
    AboutusComponent,
    FooterComponent,
    HomepageComponent,
    SanissetteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatCardModule,
    MatSelectModule, MatInputModule, MatAutocompleteModule,
    MDBBootstrapModule.forRoot()
  ],

  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
