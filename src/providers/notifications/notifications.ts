import { Http  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: Http) {
    console.log('Hello NotificationsProvider Provider');
  }

  Get() // GET Request - /notifications
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/notifications?token='+localStorage.getItem('token')).map(res => res.json());
  }
}
