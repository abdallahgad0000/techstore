import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _HttpClient : HttpClient) { }
  getProduct(id:number):Observable<any>
  {
    return this._HttpClient.get(`http://localhost/techstore/get/getproduct.php?id=${id}`);
  }
  getProductByCategory(id:any,page:any = 1):Observable<any>
  {
    return this._HttpClient.get(`http://localhost/techstore/get/getproductsbycategory.php?id=${id}&page=${page}`);
  }
  getSearch(word:any,page:any = 1):Observable<any>
  {
    return this._HttpClient.get(`http://localhost/techstore/get/getsearch.php?word=${word}&page=${page}`);
  }
  getCartHeader():Observable<any>
  {
    return this._HttpClient.get(`http://localhost/techstore/get/getcartheader.php`);
  }
}
