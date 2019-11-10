import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:3002',
    'Content-type' : 'application/json',
  })
};

@Injectable()
export class DataService {
point$;
  constructor(private http: HttpClient) {
   }
  url = 'http://localhost:3002';

  getData() {
    return this
      .http
      .get(`${this.url}/`, httpOptions);
  }
  getCurrencies() {
    return this
      .http
      .get(`${this.url}/currencies`, httpOptions);
  }
  getUnitsByPositions() {
    return this
      .http
      .get(`${this.url}/findUnitsByPositions`, httpOptions);
  }
  getPositions() {
    return this
      .http
      .get(`${this.url}/positions`, httpOptions);
  }
}
