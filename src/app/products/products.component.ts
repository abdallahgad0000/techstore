import { CartServiceService } from './../cart-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { GetCategoriesService } from '../get-categories.service';
declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  posts: any;
  page: any;
  lastPage: any;
  categories: any;
  test: TestService;
  unLoaded: boolean = true;
  // preLoaderContainer:any= document.getElementById("preLoaderContainer");
  constructor(
    _TestService: TestService,
    _ActivatedRoute: ActivatedRoute,
    _GetCategoriesService: GetCategoriesService,
    _Router: Router,
    private _CartServiceService: CartServiceService
  ) {
    this.page = _ActivatedRoute.snapshot.paramMap.get('page');
    _TestService.getTest(this.page).subscribe((data) => {
      if (!data['products'][0]) {
        _Router.navigateByUrl('/notfoundpage');
      } else {
        this.posts = data;
        this.lastPage = data['pages'].length;
        $('#preLoaderContainer svg').fadeOut(100)
        $('#preLoaderContainer').fadeOut(300)
      }
    });
    this.test = _TestService;
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });
  }
  nn(page) {
    $('#preLoaderContainer svg').fadeIn(1)
    $('#preLoaderContainer').fadeIn(1)
    this.test.getTest(page).subscribe((data) => {
      if (!data['products'][0]) {
        let _Router: Router;
        _Router.navigateByUrl('/notfoundpage');
      } else {
        this.posts = data;
        this.lastPage = data['pages'].length;
        $('#preLoaderContainer svg').fadeOut(100)
        $('#preLoaderContainer').fadeOut(300)
      }
    });
    this.page = page;
  }
  addToCart(item) {
    let prodId = item.id;
    let prodImg = item.img;
    let prodPrice = item.price;
    let prodName = item.name;
    let cart = {
      prodId: prodId,
      prodImg: prodImg,
      prodPrice: prodPrice,
      prodName: prodName,
      totalPrice: prodPrice,
      qty: 1,
    };
    this._CartServiceService.setItem(cart);
  }
  checkIfExistInCart = function (item) {
    let prodId = item.id;

    let cart = {
      prodId: prodId,
      qty: 1,
    };
    if (this._CartServiceService.itemExist(cart)) {
      return false;
    } else {
      return true;
    }
  };

  ngOnInit() {
    // $(".product_fav").on("ready",()=>{
    // if(this._CartServiceService.itemExist(this)){
    // }
    //   $(this).css({"color":"red"})
    // })
    // setTimeout(()=>{
    //   console.log(this.posts['pagesCount'])
    //   let pagesNav = document.getElementById("pagesNav");
    // let pagesContainer =``;
    // for(let i=1; i<= this.posts['pagesCount'];i++){
    //   pagesContainer+=`
    //   <li ><a routerLink="/products">${i}</a></li>
    //   `;
    // }
    // pagesNav.innerHTML=pagesContainer;
    // },0)
    // this.lastPage =
    //   this.page <= this.posts['pages'][this.posts['pages'].length];
  }
}
