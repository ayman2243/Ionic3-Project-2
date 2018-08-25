import { Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }

  Get() // GET Request - /profile
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/profile?token='+localStorage.getItem('token')); 
  }

  Update(data:{}) // PUT Request - /profile
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.put(localStorage.getItem('apiUrl')+'/profile?token='+localStorage.getItem('token'),
    data,
    options
    );
  }

  updatePhone(phone) // PUT Request - /profile
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.put(localStorage.getItem('apiUrl')+'/update-phone?token='+localStorage.getItem('token'),
    {phone: phone},
    options
    );
  }

  ChangePassword(
    old_password: string,
    password: string,
    password_confirmation: string
  ) // POST Request - /update-password
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/update-password?token='+localStorage.getItem('token'),
    {
      old_password: old_password,
      password: password,
      password_confirmation: password_confirmation
    },
    options
    );
  }


  fcm(fcm: string) // POST Request - {{url}}/update-fcm 
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/update-fcm?token='+localStorage.getItem('token'),
    { fcm: fcm },
    options
    );
  }

}
