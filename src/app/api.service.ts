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
  // postCart(cart:any):Observable<any>
  // {
  //   return this._HttpClient.get(`http://localhost/techstore/post/addcart.php?prodPrice=${cart['prodPrice']}&&qty=${cart['qty']}&&prodId=${cart['prodId']}&&prodName=${cart['prodName']}&&prodImg=${cart['prodImg']}&&prodDesc=${cart['prodDesc']}&&catName=${cart['catName']}`);
  // }
  // postCart2(cart:any):Observable<any>
  // {
  //   return this._HttpClient.post(`http://localhost/techstore/post/addcart.php?prodPrice=${cart['prodPrice']}&&qty=${cart['qty']}&&prodId=${cart['prodId']}&&prodName=${cart['prodName']}&&prodImg=${cart['prodImg']}&&prodDesc=${cart['prodDesc']}&&catName=${cart['catName']}`,cart);
  // }
  //lOSU0Q<IY1KJ8H%3
}
