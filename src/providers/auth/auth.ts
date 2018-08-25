import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http) 
  {
    //console.log('Hello AuthProvider Provider');
  }

  login( 
      field: string,
      password: string
    )
  {
    let headers = new Headers;
    headers.append('content-type','application/json');
    let options = new RequestOptions({ headers:headers});
    
    return this.http.post(localStorage.getItem('apiUrl')+'/login',
    {
      field: field, 
      password: password
    }, options);
  }

  signup(
    fname: string, 
    lname: string, 
    phone: string, 
    password: string,
    password_confirmation: string, 
    email: string,
    company_name: string,
    calling_code: number,
    label: string,
    country_id: number,
    city_id: number,
    district: string,
    address_phone: string,
    lat: string,
    lng: string,
    town: string,
    mark: string,
    building_no: string,
    st_no: string,
    telephone: string,
    secondary_phone: string
  )
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
   
    return this.http.post(localStorage.getItem('apiUrl')+'/app-register',{
      fname: fname, 
      lname: lname, 
      phone: phone, 
      password: password,
      password_confirmation: password_confirmation, 
      email: email,
      telephone: telephone,
      company_name: company_name,
      calling_code: calling_code,
      label: label,
      country_id: country_id,
      city_id: city_id,
      district: district,
      address_phone: address_phone,
      lat: lat,
      lng: lng,
      town: town,
      mark: mark,
      building_no: building_no,
      st_no: st_no,
      secondary_phone: secondary_phone
    }, options);
  }

  checkEmailOrPhone(field)
  {
    return this.http.get(localStorage.getItem('apiUrl')+'/find-user?field='+field);
  }

  sendSMS(user_id: number, token: string)
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl')+'/otp-send?token='+token,{user_id: user_id}, options);
  }

  verifySMS(user_id: number, otp: number)
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl')+'/otp-verify?token='+localStorage.getItem('token'),{user_id: user_id, otp: otp}, options);
  }


  forgetPassword(field)
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl')+'/password/forget',{field: field}, options);
  }

  resetPassword(data: any)
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl')+'/password/reset',data, options);
  }

  changePassword(data: any) // POST Request - /update-password
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    return this.http.post(localStorage.getItem('apiUrl')+'/update-password?token='+localStorage.getItem('token'),data, options);
  }


}
