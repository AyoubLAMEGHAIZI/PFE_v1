import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { RestService } from './../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';

const stationIcon = L.icon({
  iconUrl: './assets/img/station_icon.png',

  iconSize: [25, 45],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]

});

@Component({
  selector: 'app-sanissette',
  templateUrl: './sanissette.component.html',
  styleUrls: ['./sanissette.component.css']
})

export class SanissetteComponent implements OnInit,AfterViewInit {

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  @Input() stationD = { name: '', distance: ''};

  station: any;
  sanissettes: any ;
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

  ngOnInit() {
  }

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


  getSanissettesFromStat() {
    
    this.lgMarkers.clearLayers();
    this.rest.getStation(this.stationD.name.toUpperCase()).pipe(
      map( data => {
        this.station = data;
        this.latitude = this.station.records[0].fields.stop_coordinates[0];
        this.longuitude = this.station.records[0].fields.stop_coordinates[1];
        const stationMarker = L.marker([this.latitude, this.longuitude]).addTo(this.lgMarkers)
        .bindPopup('Station: ' + this.station.records[0].fields.stop_name).openPopup();
        this.map.setView([this.latitude, this.longuitude], 15);
        return this.station;
      }),
      mergeMap( station => this.rest.getSanissette(this.latitude, this.longuitude,this.stationD.distance))
    ).subscribe(sanissette=> {
      this.sanissettes = sanissette;
      this.sanissettes.records.map(r => r.fields).
      forEach(element => {
        L.marker([element.geo_point_2d[0], element.geo_point_2d[1]]).addTo(this.lgMarkers)
        .bindPopup(element.horaire + ', ' + element.adresse);
      });
    });




  }
}
