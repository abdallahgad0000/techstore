import { CartServiceService } from './../cart-service.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  result: any;
  id: any;
  test: ApiService;
  price: any;
  quantity = $('#quantity_input').attr('value');
  qty = 1;
  prodPrice:any;
  unLoaded: boolean = true;

  // private _ApiService: any;
  increase() {
    this.qty = this.qty + 1;
    $('#quantity_input').attr({ value: `${this.qty}` });

    // this.quantity_input.value++;
    this.result.product.prodPrice = this.price * this.qty;
  }
  decrease() {
    if (this.qty > 1) {
      // this.quantity_input.value--;
      this.qty = this.qty - 1;
      $('#quantity_input').attr({ value: `${this.qty}` });
      this.result.product.prodPrice = this.price * this.qty;
    }
  }
  constructor(
    private _ApiService: ApiService,
    _ActivatedRoute: ActivatedRoute,
    _Router: Router,
    private _CartServiceService :CartServiceService
  ) {
    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    _ApiService.getProduct(this.id).subscribe((data) => {
      if (!data.msg) {
        if (_CartServiceService.itemExist(data.product)){
          $('#toAdd').css({'display': "none"});
          $('#toDelete').css({'display': "block"});
        }
        this.result = data;
        this.price = data.product.prodPrice;
        this.prodPrice = data.product.prodPrice;
        $('#preLoaderContainer svg').fadeOut(100)
        $('#preLoaderContainer').fadeOut(300)
      } else {
        _Router.navigateByUrl('/notfoundpage')
      }
    });
    this.test = _ApiService;
  }


  submitForm(){
    let qty = $('#quantity_input').val()
    let prodId = this.result.product.prodId;
    let prodName = this.result.product.prodName;
    let prodImg = this.result.product.prodImg;
    let prodPrice = this.prodPrice;
    let totalPrice = this.result.product.prodPrice;
    let prodDesc = this.result.product.prodDesc;
    let catName = this.result.product.catName;
    let cartData ={
      "qty" : qty,
      "prodId" : prodId,
      "prodName" : prodName,
      "prodImg" : prodImg,
      "prodPrice" : prodPrice,
      "totalPrice" : totalPrice,
      "prodDesc" : prodDesc,
      "catName" : catName,
      "submit" : "submit"
    };

    let response = this._CartServiceService.setItem(cartData);
    if (response == "added") {
      $('#toAdd').css({'display': "none"});
      $('#toDelete').css({'display': "block"});
    } else {
      $('#toDelete').css({'display': "none"});
      $('#toAdd').css({'display': "block"});
    }

  }



  ngOnInit() {
  }
}
