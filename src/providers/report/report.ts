import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {

  constructor(public http: Http) {
    console.log('Hello ReportProvider Provider');
  }
  send( 
    start: any,
    end: any,
    email:any,
    orders:any,
    withdraws:any
  )
{
  let headers = new Headers;
    
  headers.append("Content-Type", "application/json");
  
  let options = new RequestOptions({ headers: headers});
 
  return this.http.post(localStorage.getItem('apiUrl')+'/reports?token='+localStorage.getItem('token'),
  {
    from: start, 
    to: end,
    email:email,
    orders:orders,
    withdraws:withdraws
  }, options);
}

}
