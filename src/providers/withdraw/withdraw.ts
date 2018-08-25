import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WithdrawProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WithdrawProvider {

  constructor(public http: Http) {
    console.log('Hello WithdrawProvider Provider');
  }

  Banks() {
    return this.http.get(localStorage.getItem('apiUrl') + '/banks?token=' + localStorage.getItem('token'))
  }

  MakeWithdraw(data:{}) {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', "Bearer " + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl') + '/withdraws?token=' + localStorage.getItem('token'), 
    data
    ,options);
  }

  GetWithdraw() //get withdraw - /withdraw
  {
    return this.http.get(localStorage.getItem('apiUrl') + '/withdraws?token=' + localStorage.getItem('token'));
  }

  DeleteWithdraw(id: number)
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', "Bearer " + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(localStorage.getItem('apiUrl')+'/withdraws/'+id+'?token='+localStorage.getItem('token'));
  }
  EditWithdraw(id: number, data: {}) // PUT Request - /withdraws/{{id}}
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', "Bearer " + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put(localStorage.getItem('apiUrl')+'/withdraws/'+id+'?token='+localStorage.getItem('token'),
      data,
      options
    );
  }



}
