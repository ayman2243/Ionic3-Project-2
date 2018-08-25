import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BillsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillsProvider {

  constructor(public http: Http) {
    console.log('Hello BillsProvider Provider');
  }

  Get(page = 1) // GET Request - /bills
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/bills?token='+localStorage.getItem('token')+'&page='+page+'&perPage=50'); 
  }

}
