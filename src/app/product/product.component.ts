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
    _ApiService: ApiService,
    _ActivatedRoute: ActivatedRoute,
    _Router: Router
  ) {
    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    _ApiService.getProduct(this.id).subscribe((data) => {
      if (!data.msg) {
        this.result = data;
        this.price = data.product.prodPrice;
      } else {
        _Router.navigateByUrl('/notfoundpage')
      }
    });
    this.test = _ApiService;
  }

  ngOnInit() {}
}
