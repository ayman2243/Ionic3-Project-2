import { Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AddressesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressesProvider {

  constructor(public http: Http) {
    console.log('Hello AddressesProvider Provider');
  }

  Add(
   data:{}
  ) // POST Request - /other-address
  {
    console.log('data-sent', data);
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/other-address?token='+localStorage.getItem('token'), 
    
    data
    ,options);
  }

  Get() // GET Request - /other-addresses
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/other-addresses?token='+localStorage.getItem('token'));
  }

  Update(id: number, data:{}) // PUT Request - /other-address/62
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});

    return this.http.put(localStorage.getItem('apiUrl')+'/other-address/'+id+'?token='+localStorage.getItem('token'),
    data
    ,options);
  }

  Delete(id: number) // DELETE Request - /other-address/63
  {
    return this.http.delete(localStorage.getItem('apiUrl')+'/other-address/'+id+'?token='+localStorage.getItem('token'));
  }



}
