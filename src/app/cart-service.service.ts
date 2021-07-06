import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor() {
    this.cart = this.getCart();
  }

  public cart: any = [];
  private deleteIndex: number;
  public itemExist(item: any) {
    let isExist = false;
    for (let i = 0; i < this.cart.length; i++) {
      if (item.prodId == this.cart[i].prodId) {
        isExist = true;
        this.deleteIndex = i;
        break;
      }
    }
    if (isExist) {
      return true;
    } else {
      return false;
    }
  }

  public setItem(item: {}) {
    if (this.itemExist(item)) {
      this.deleteItem(this.deleteIndex);
      return 'deleted';
    } else {
      this.addItem(item);
      return 'added';
    }
  }
  private addItem(item: {}) {
    this.cart.push(item);
    this.setCart();
  }
  private deleteItem(index: number) {
    this.cart.splice(this.deleteIndex, 1);
    this.setCart();
  }
  private setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      return cart;
    } else {
      cart = [];
      return cart;
    }
  }

  public countItems() {
    return this.cart.length;
  }
  public totalPrice() {
    let total = 0;
    if (this.cart[0]) {
      this.cart.forEach((item) => {
        total += Number(item.prodPrice) * Number(item.qty);
      });
    }
    return total;
  }
  public submitCart() {
    this.cart = [];
    this.setCart();
  }
}
