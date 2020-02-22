import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {


    endpoint = 'https://dataratp2.opendatasoft.com/api/records/1.0/search/';
    endpoint2 = 'https://dataratp.opendatasoft.com/api/records/1.0/search/';
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getStations(): Observable<any> {
    return this.http.get(this.endpoint + '?dataset=positions-geographiques-des-stations-du-reseau-ratp').pipe(
      map(this.extractData));

  }

  getStation(stationNom): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.endpoint + '?dataset=positions-geographiques-des-stations-du-reseau-ratp&rows=1&refine.stop_name=' + stationNom).pipe(
      map(this.extractData));

  }

  getCommerces(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.endpoint2 + '?dataset=liste-des-commerces-de-proximite-agrees-ratp').pipe(
      map(this.extractData));

  }

  getCommerce(latitude, long, dist): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.endpoint2 + '?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=200&sort=code_postal&geofilter.distance=' + latitude + '%2C+' + long + '%2C+' + dist).pipe(
      map(this.extractData));

  }

  getCommercesFromStation(latitude, longuitude): Observable<any> {

      // tslint:disable-next-line:max-line-length
      return this.http.get(this.endpoint2 + '?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=200&sort=code_postal&geofilter.distance=' + latitude + '%2C+' + longuitude + '%2C+' + 1000).pipe(
        map(this.extractData));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }


}
