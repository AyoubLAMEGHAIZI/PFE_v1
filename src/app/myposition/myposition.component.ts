import { map, mergeMap } from 'rxjs/operators';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RestService } from './../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { GeoCoord } from '../variablesGlobales';
import * as L from 'leaflet';

const stationIcon = L.icon({
  iconUrl: './assets/img/station_icon.png',

  iconSize: [25, 45],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]

});

@Component({
  selector: 'app-myposition',
  templateUrl: './myposition.component.html',
  styleUrls: ['./myposition.component.css']
})
export class MypositionComponent implements OnInit {
  x: number;
  longitude: number = 2.213749;
  latitude: number = 46.227638;
  localisation_autorisation: boolean = false;
  commerces: any;
  carte: any;
  map: any;
  lgMarkers = new L.LayerGroup();

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private param: GeoCoord) { }


  ngOnInit() {
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  ngAfterViewInit(): void {
    this.initMap(48.8534, 2.3488);
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  private initMap(lat: number, long: number): void {
    this.map = L.map('map', {
      center: [lat, long],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.map.addLayer(this.lgMarkers);
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  getLocation() {
    console.log(' Avant localisation: Latitude : ' + this.latitude + ' Longitude: ' + this.longitude);
    if (navigator.geolocation) {
      /*--- ANCIEN METHODE NE FONCTIONNE PAS 
      navigator.geolocation.getCurrentPosition(this.showLocation2);
      */

      navigator.geolocation.getCurrentPosition(pos => {
        this.longitude = +pos.coords.longitude;
        this.latitude = +pos.coords.latitude;
        //alert('Latitude : ' + this.latitude + ' Longitude: ' + this.longitude);
        this.showLocation();
      });

      this.localisation_autorisation = true;
    } else {
      this.localisation_autorisation = false;
    }
    this.map.setView([this.latitude, this.longitude], 15);
    const myPositionMarker = L.marker([this.latitude, this.longitude]).addTo(this.lgMarkers)
      .bindPopup('Ma position')
      .openPopup();
    this.map.setView([this.latitude, this.longitude], 15);


  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  showLocation() {
    console.log('Latitude : ' + this.latitude + ' Longitude: ' + this.longitude);
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  getCommercePos() {

    this.lgMarkers.clearLayers();


    this.rest.getCommercesFromStation(this.latitude, this.longitude)
      .subscribe(comm => {
        this.commerces = comm;
        this.commerces.records.map(r => r.fields).
          forEach(element => {
            L.marker([element.coord_geo[0], element.coord_geo[1]]).addTo(this.lgMarkers)
              .bindPopup(element.tco_libelle + ', ' + element.dea_numero_rue_livraison_dea_rue_livraison)
              .openPopup();
          });
      });

  }




  /* --- ANCIEN METHODE NE FONCTIONNE PAS 
    showLocation2(pos) {
      this.longitude = +pos.coords.longitude;
      this.latitude = +pos.coords.latitude;
      alert('Latitude : ' + this.latitude + ' Longitude: ' + this.longitude);
    }
  */


}
