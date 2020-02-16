import { RestService } from './../rest.service';
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeoCoord } from '../variablesGlobales';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSliderModule} from '@angular/material';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css'],
})
export class StationDetailComponent implements OnInit {

  @Input() stationDetails = { name: ''};

  station: any;
  records: any[];
  fields: any;
  exemplesStations: string[] = ['Auber', 'Nations', 'Chatelet'];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private param: GeoCoord) { }

  ngOnInit() {  }

  AppelStation() {
    this.rest.getStation(this.stationDetails.name.toUpperCase()).subscribe((data: {}) => {
      console.log(data);
      this.station = data;
    });

  }

}
