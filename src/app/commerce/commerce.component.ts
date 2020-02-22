import { map, mergeMap } from 'rxjs/operators';
import { RestService } from './../rest.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';

const stationIcon = L.icon({
  iconUrl: './assets/img/station_icon.png',

  iconSize: [25, 45],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]

});


@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.component.html',
  styleUrls: ['./commerce.component.css'],
})
export class CommerceComponent implements OnInit, AfterViewInit {

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  @Input() stationD = { name: '', distance: ''};

  station: any;
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

    /*L.marker([48.8534, 2.3488]).addTo(this.map)
    .bindPopup('Ici c\'est Paris !');*/
  }


  getCommercesFromStat() {

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
      mergeMap( station => this.rest.getCommerce(this.latitude, this.longuitude, this.stationD.distance))
    ).subscribe( comm => {
      this.commerces = comm;
      this.commerces.records.map(r => r.fields).
      forEach(element => {
        L.marker([element.coord_geo[0], element.coord_geo[1]]).addTo(this.lgMarkers)
        .bindPopup(element.tco_libelle + ', ' + element.dea_numero_rue_livraison_dea_rue_livraison);
      });
    });




  }
}
