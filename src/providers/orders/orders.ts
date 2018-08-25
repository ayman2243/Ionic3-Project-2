import { Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  constructor(public http: Http) {
    console.log('Hello OrdersProvider Provider');
  }

  Create(data: {}) // POST Request - /orders
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/orders?token='+localStorage.getItem('token'),
    data,
    options
    );
  }

  Cancel(id:number) // POST Request - /orders/{{id}}/cancel
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.post(localStorage.getItem('apiUrl')+'/orders/'+id+'/cancel?token='+localStorage.getItem('token'),
    {},
    options
    ).map(res => res.json());
  }

  Filter (Sort: string, Asorting = null, page = 1)  // GET Request - /orders?user=sen
  {
    let q = 'user='+Sort;
    if(Asorting != null)
      q = 'user='+Sort+'&order='+Asorting
    
    return this.http.get(`${localStorage.getItem('apiUrl')}/orders?${q}&token=${localStorage.getItem('token')}&page=${page}&perPage=1`)
  }

  Details(id:number) // GET Request - /orders/{{id}}
  {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.get(localStorage.getItem('apiUrl')+'/orders/'+id+'?token='+localStorage.getItem('token'),
    options
    ).map(res => res.json());
  }

  GetExtraServices(){
    let headers = new Headers;
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers});
    return this.http.get(localStorage.getItem('apiUrl')+'/extra-services?token='+localStorage.getItem('token'),
    options
    ).map(res => res.json());

    // return { "extra_services": [
    //                             { "id": 1, "title": "تغليف", "amount": 50 },
    //                             { "id": 2, "title": "قابل للكسر", "amount": 50 }
    //                           ] };

    }

}
