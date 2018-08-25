import { Http ,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  constructor(public http: Http) {
    console.log('Hello TransactionProvider Provider');
  }
  banks(){
    return this.http.get(localStorage.getItem('apiUrl')+'/withdraws?token='+localStorage.getItem('token'));
  }

  transction(page = 1){
    return this.http.get(localStorage.getItem('apiUrl')+'/transactions?token='+localStorage.getItem('token')+'&page='+page+'&perPage=2');
  }
  
  send( 
    bank: any,
    amount: any,
   
  )
{
  let headers = new Headers;
    
  headers.append("Content-Type", "application/json");
  
  let options = new RequestOptions({ headers: headers});
 
  return this.http.post(localStorage.getItem('apiUrl')+'/transactions?token='+localStorage.getItem('token'),
  {
    withdraw_id: bank, 
    amount: amount,
  }, options);
}
}
