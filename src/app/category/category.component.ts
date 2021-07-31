import { ActivatedRoute ,Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GetCategoriesService } from '../get-categories.service';
import { CartServiceService } from '../cart-service.service';
import {Title} from "@angular/platform-browser";

declare let $:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any;
  products: any;
  currentPage: any;
  lastPage: any;
  test: ApiService;
  currentCategory: any;
  unLoaded: boolean = true;

  constructor(
    _GetCategoriesService: GetCategoriesService,
    _ApiService: ApiService,
    _ActivatedRoute: ActivatedRoute,
    _Router:Router,
    private _CartServiceService :CartServiceService,
    private titleService:Title
  ) {
    this.titleService.setTitle("Techstore | Category");

    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });

    this.test = _ApiService;

    this.currentPage = _ActivatedRoute.snapshot.paramMap.get('page');
    this.currentCategory = _ActivatedRoute.snapshot.paramMap.get('id');
    _ApiService
      .getProductByCategory(this.currentCategory, this.currentPage)
      .subscribe((data) => {
        if (!data.msg){
        this.products = data;
        this.lastPage = data['pages'].length;
        $('#preLoaderContainer svg').fadeOut(100)
        $('#preLoaderContainer').fadeOut(300)
        this.makeActive(this.currentPage)
        } else {
          _Router.navigateByUrl('/notfoundpage')
        }
      });

      _Router.events.subscribe((event:Event)=>{
        if(event instanceof NavigationStart) {

        }
        if(event instanceof NavigationEnd) {
          $('#preLoaderContainer svg').fadeIn(1)
          $('#preLoaderContainer').fadeIn(1)

            this.currentCategory = _ActivatedRoute.snapshot.paramMap.get("id");
            this.currentPage = _ActivatedRoute.snapshot.paramMap.get("page")

            _ApiService.getProductByCategory(this.currentCategory,this.currentPage).subscribe((data) => {

              if (!data.msg){
                this.products = data;
                this.lastPage = data['pages'].length;
                $('#preLoaderContainer svg').fadeOut(100)
                $('#preLoaderContainer').fadeOut(300)
                this.makeActive(this.currentPage)
                } else {
                  _Router.navigateByUrl('/notfoundpage')
                }

            });

        }
      })


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

  ngOnInit() {}

}

