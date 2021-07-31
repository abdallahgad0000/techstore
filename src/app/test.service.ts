import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _HttpClient : HttpClient) { }

  getProduct(){
    return this._HttpClient.get("https://techstoretest1.000webhostapp.com/get/getproducts.php");
  }

  getTest(page:number = 1):Observable<any>
  {
    return this._HttpClient.get(`https://techstoretest1.000webhostapp.com/get/getproducts.php?page=${page}`);
  }



}



//_HttpClient.get("http://localhost/techstore/get/getproducts.php");
