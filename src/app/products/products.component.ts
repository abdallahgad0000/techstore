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
        this.makeActive(this.page)

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
        this.makeActive(this.page)

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

  makeActive(index:any){
    for(let i = 0 ; i <= $('#pagesNav').children().length;i++){
    $($('#pagesNav').children()[i]).css({"backgroundColor":"#fff"})
    }
    $($('#pagesNav').children()[index-1]).css({"backgroundColor":"#8b8b8b0c"})
  }

  ngOnInit() {  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

      $($('#pagesNav').children()[this.page-1]).css({"backgroundColor":"#8b8b8b0c"})
  }
}
