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
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getproduct.php?id=${id}`);
  }
  getProductByCategory(id:any,page:any = 1):Observable<any>
  {
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getproductsbycategory.php?id=${id}&page=${page}`);
  }
  getSearch(word:any,page:any = 1):Observable<any>
  {
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getsearch.php?word=${word}&page=${page}`);
  }
  getCartHeader():Observable<any>
  {
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getcartheader.php`);
  }
  getProductImgs(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getproductimgs.php?id=${id}`);
  }
  // postCart(cart:any):Observable<any>
  // {
  //   return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/post/addcart.php?prodPrice=${cart['prodPrice']}&&qty=${cart['qty']}&&prodId=${cart['prodId']}&&prodName=${cart['prodName']}&&prodImg=${cart['prodImg']}&&prodDesc=${cart['prodDesc']}&&catName=${cart['catName']}`);
  // }
  // postCart2(cart:any):Observable<any>
  // {
  //   return this._HttpClient.post(`https://techstoretest1.000webhostapp.com/post/addcart.php?prodPrice=${cart['prodPrice']}&&qty=${cart['qty']}&&prodId=${cart['prodId']}&&prodName=${cart['prodName']}&&prodImg=${cart['prodImg']}&&prodDesc=${cart['prodDesc']}&&catName=${cart['catName']}`,cart);
  // }
  //lOSU0Q<IY1KJ8H%3
}
