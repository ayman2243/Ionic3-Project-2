import { Http, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the PromocodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromocodeProvider {

  
  constructor(public http: Http) {
    console.log('Hello PromocodeProvider Provider');
  }

  Post( code: string ) // POST Request - /coupons-users
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/coupons-users?token='+localStorage.getItem('token'),
    {code: code},
    options
    ).map(res => res.json());
  }

  Get() // GET Request - /coupons-users
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/coupons-users?token='+localStorage.getItem('token')).map(res => res.json());
  }

}
