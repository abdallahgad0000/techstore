import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoriesService } from '../get-categories.service';
import { CartServiceService } from '../cart-service.service';
declare let $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchWord: any;
  categories: any;
  searchInput: any;
  cartCount: any;
  totalPrice: any;
  test: Router;
  constructor(
    _GetCategoriesService: GetCategoriesService,
    private _Router: Router,
    private _CartServiceService:CartServiceService
  ) {
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });
    this.test = _Router;
    this.cartCount = _CartServiceService.countItems();
    this.totalPrice = _CartServiceService.totalPrice();

  }
  submit() {
    this.test.navigateByUrl(`/search/${this.searchWord}/1`);
  }
  goToCart(){
    this._Router.navigateByUrl("/cart");
  }

  ngOnInit() {
    this.searchInput = document.getElementById('header_search_input');
    this.searchInput.addEventListener('keyup', (aa, _Router: Router) => {
      if (aa.code == 'Enter') {
        this.submit();
      }
    });
    setInterval(()=>{
      this.cartCount = this._CartServiceService.countItems();
      this.totalPrice = this._CartServiceService.totalPrice();
    },100);

    $('#applicationPreLoader').ready(()=>{
      setTimeout(()=>{
        $('#applicationPreLoader').fadeOut();
        $('body').css({'overflowY':"auto"})
      },3000)
    })
  }
}
