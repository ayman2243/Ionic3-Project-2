import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ErrorhandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorhandlerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ErrorhandlerProvider Provider');
  }

  Validation( err: any ){
    
    let body = JSON.parse(err['_body']);
   
    


  }

}
