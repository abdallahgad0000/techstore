import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartServiceService : CartServiceService) {

  }
  cart:any = this._CartServiceService.cart;
  totalPrice = this._CartServiceService.totalPrice();
  deleteFromCart(item){
    this._CartServiceService.setItem(item)
  }
  
  ngOnInit() {
    setInterval(()=>{
      this.totalPrice = this._CartServiceService.totalPrice();
    },100)
  }

}
