import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {
  getProductByCategory(page: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _HttpClient : HttpClient) { }
  getTest():Observable<any>
  {
    return this._HttpClient.get(`http://localhost/techstore/get/getcategories.php`);
  }


}
