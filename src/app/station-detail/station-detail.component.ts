import { RestService } from './../rest.service';
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSliderModule} from '@angular/material';
import * as L from 'leaflet';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css'],
})
export class StationDetailComponent implements OnInit {



  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }


  @Input() stationDetails = { name: ''};

  station: any;
  records: any[];
  fields: any;
  exemplesStations: string[] = ['Auber', 'Nations', 'Chatelet'];
  commerces: any ;
  latitude: number;
  longuitude: number;
  carte: any;

  map: any;
   // ---
   autoTicks = false;
   max = 2000;
   min = 200;
   showTicks = true;
   step = 10;
   thumbLabel = true;
   value = 200;
   tickInterval = 1000;
   // ---

 lgMarkers = new L.LayerGroup();
   getSliderTickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this.tickInterval) : 0;
  }

  ngOnInit() {  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
     this.initMap(48.8534, 2.3488);
  }

  private initMap(lat: number, long: number): void {
    this.map = L.map('map', {
      center: [ lat, long ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.addLayer(this.lgMarkers);


  }

  AppelStation() {

    this.lgMarkers.clearLayers();

    this.rest.getStation(this.stationDetails.name.toUpperCase()).subscribe((data: {}) => {
      console.log(data);
      this.station = data;
      this.latitude = this.station.records[0].fields.stop_coordinates[0];
      this.longuitude = this.station.records[0].fields.stop_coordinates[1];
      console.log(this.latitude);
      console.log(this.longuitude);
      const stationMarker = L.marker([this.latitude, this.longuitude]).addTo(this.lgMarkers)
      .bindPopup('Station: ' + this.station.records[0].fields.stop_name).openPopup();
      this.map.setView([this.latitude, this.longuitude], 15);
    });

  }



}
