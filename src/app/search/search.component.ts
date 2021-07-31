import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GetCategoriesService } from '../get-categories.service';
import { CartServiceService } from '../cart-service.service';
import {Title} from "@angular/platform-browser";

declare var $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  categories:any;
  word:any;
  wod:any;
  products:any;
  lastPage:any;
  test:ApiService;
  currentPage:any;
  unLoaded: boolean = true;

  constructor( _GetCategoriesService : GetCategoriesService,_Router:Router,_ActivatedRoute:ActivatedRoute ,_ApiService:ApiService, private _CartServiceService :CartServiceService,private titleService:Title ) {
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });

    this.titleService.setTitle("Techstore | Search");


    // this.word = _ActivatedRoute.snapshot.paramMap.get("word");
    _ActivatedRoute.paramMap.subscribe((data)=>{
      this.word = data['params'].word
    })
    // _ApiService.getSearch(this.word).subscribe((data)=>{
    //   this.products = data;
    //   this.lastPage = data['pages'].length;
    // })


    _ApiService.getSearch(this.word).subscribe((data) => {
      if (!data.msg){
        this.products = data;
        this.lastPage = data['pages'].length;
        this.currentPage = 1;
        $('#preLoaderContainer svg').fadeOut(100)
        $('#preLoaderContainer').fadeOut(300)
        this.makeActive(this.currentPage)
        } else {
          _Router.navigateByUrl('/notfoundpage')
        }
    });


    this.test = _ApiService;


    _Router.events.subscribe((event:Event)=>{
      if(event instanceof NavigationStart) {

      }
      if(event instanceof NavigationEnd) {
        $('#preLoaderContainer svg').fadeIn(1)
        $('#preLoaderContainer').fadeIn(1)

          this.word = _ActivatedRoute.snapshot.paramMap.get("word");
          this.currentPage = _ActivatedRoute.snapshot.paramMap.get("page")

          _ApiService.getSearch(this.word,this.currentPage).subscribe((data) => {
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
   nextPrevious(page) {
    // this.test
    //   .getSearch(this.word, page)
    //   .subscribe((data) => (this.products = data));
    // this.currentPage = page;
  }
  makeActive(index:any){
    for(let i = 0 ; i <= $('#pagesNav').children().length;i++){
    $($('#pagesNav').children()[i]).css({"backgroundColor":"#fff"})
    }
    $($('#pagesNav').children()[index-1]).css({"backgroundColor":"#8b8b8b0c"})
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

    // $(location.href).on("hashchange",function(){console.log("aaa")})
    // window.addEventListener("hashchange",()=>{console.log("jhj")})

    $(".product_fav").click(function(){
      $(this).children().css("color","green");
    })
  }

}
