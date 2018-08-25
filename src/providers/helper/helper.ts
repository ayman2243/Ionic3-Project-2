// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor() {
    console.log('Hello HelperProvider Provider');
  }


  
  Error_Handler(error){
    if (error.status === 0 || error.status === 500 ){
      return 'الرجاء التحقق من الاتصال بالشبكة';
    } else if(error.status === 404){
      console.log('hello');
    }else
      
      console.log('Error Message: ', JSON.parse(error['_body']));
      
      if ( JSON.parse(error['_body']).amount != undefined && JSON.parse(error['_body']).amount[0] == "القيمة يجب ان يكون على الاقل 1")
        return "لا يمكن ان تكون قيمة التحويل بصفر"
      else if ( JSON.parse(error['_body']).amount != undefined && JSON.parse(error['_body']).amount[0] == "القيمة يجب الا يكون اكبر من 0.00")
        return "رصيدك لا يسمح"
      else if(JSON.parse(error['_body']).amount != undefined){
        return JSON.parse(error['_body']).amount[0];
      }else if(JSON.parse(error['_body']).phone != undefined){
        return JSON.parse(error['_body']).phone[0];
      }else if(JSON.parse(error['_body']).error != undefined)
        return JSON.parse(error['_body']).error;
      
      return 'الرجاء التحقق من بياناتك ';
  }

  
}
