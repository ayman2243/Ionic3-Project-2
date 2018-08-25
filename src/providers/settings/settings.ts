import { Http  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  constructor(public http: Http) {
  }

  countries()
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/countries')
  }

  cities()
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/cities')
  }

  price()
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/prices?token='+localStorage.getItem('token'))
  }

  calling_code()
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/countries-codes')
  }

  aboutUS(){
    return this.http.get(localStorage.getItem('apiUrl')+'/about?token='+localStorage.getItem('token'));
  }

  GetFormattedAddress(location){
    let apiKey = 'AIzaSyAPSnXuuiNjPQPs8i2M0Y3J3PbZB0b7iQM';
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+apiKey+'&latlng='+location+'&sensor=true').map(res => res.json())
  }

}
