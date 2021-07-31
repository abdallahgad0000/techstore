import { CartServiceService } from './../cart-service.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Title} from "@angular/platform-browser";



import * as $ from 'jquery';
//  import 'owl.carousel'
// declare let testOwl:any;
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
  prodPrice: any;
  unLoaded: boolean = true;
  rightButtonEnabled:boolean = true;
  leftButtonEnabled:boolean = false;
  productImgs:any;

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
    private _CartServiceService: CartServiceService,
    private titleService:Title
  ) {

    this.titleService.setTitle("Techstore | Product");


    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    _ApiService.getProduct(this.id).subscribe((data) => {
      if (!data.msg) {
        if (_CartServiceService.itemExist(data.product)) {
          $('#toAdd').css({ display: 'none' });
          $('#toDelete').css({ display: 'block' });
        }
        this.result = data;
        this.price = data.product.prodPrice;
        this.prodPrice = data.product.prodPrice;
        $('#preLoaderContainer svg').fadeOut(100);
        $('#preLoaderContainer').fadeOut(300);
      } else {
        _Router.navigateByUrl('/notfoundpage');
      }
    });
    _ApiService.getProductImgs(this.id).subscribe((data)=>{
      if(!data.msg ) {
        this.productImgs = data;
      } else {
        // _Router.navigateByUrl('/notfoundpage');
      }
    })
    this.test = _ApiService;
  }

  submitForm() {
    let qty = $('#quantity_input').val();
    let prodId = this.result.product.prodId;
    let prodName = this.result.product.prodName;
    let prodImg = this.result.product.prodImg;
    let prodPrice = this.prodPrice;
    let totalPrice = this.result.product.prodPrice;
    let prodDesc = this.result.product.prodDesc;
    let catName = this.result.product.catName;
    let cartData = {
      qty: qty,
      prodId: prodId,
      prodName: prodName,
      prodImg: prodImg,
      prodPrice: prodPrice,
      totalPrice: totalPrice,
      prodDesc: prodDesc,
      catName: catName,
      submit: 'submit',
    };

    let response = this._CartServiceService.setItem(cartData);
    if (response == 'added') {
      $('#toAdd').css({ display: 'none' });
      $('#toDelete').css({ display: 'block' });
    } else {
      $('#toDelete').css({ display: 'none' });
      $('#toAdd').css({ display: 'block' });
    }
  }

  ngOnInit() {

  }


  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  rightButtonClicked(){
      // $('.owl-carousel').trigger('next.owl.carousel');
      let buttonElement = document.querySelector('.nav_active');
      //  console.log(buttonElement.nextSibling); //previousSibling
      if (buttonElement.nextSibling) {
        if (buttonElement.nextSibling.nextSibling.textContent == "") {
          this.rightButtonEnabled = true;
        } else{
          this.rightButtonEnabled = false;
        }
        this.leftButtonEnabled = true;
        this.currentSlide++;
        $(buttonElement.nextSibling).addClass('nav_active');
        $(buttonElement).removeClass('nav_active');
      }
  }

  leftButtonClicked(){
      // $('.owl-carousel').trigger('prev.owl.carousel');
      let buttonElement = document.querySelector('.nav_active');
      if (buttonElement.previousSibling) {
        if (buttonElement.previousSibling.previousSibling) {
          this.leftButtonEnabled = true;
        } else{
          this.leftButtonEnabled = false;
        }
        this.rightButtonEnabled = true;
        this.currentSlide--;
        //  console .log(buttonElement.previousSibling); //previousSibling
        $(buttonElement.previousSibling).addClass('nav_active');
        $(buttonElement).removeClass('nav_active');
      }
  }
  currentSlide:number=0;
  changeCurrentSlide(slideNumber){
    this.currentSlide = slideNumber;
  }
  dragEvent(carousel){
    // console.log(carousel.slidesOutputData.startPosition)
    if (carousel.slidesOutputData.startPosition > this.currentSlide ) {
      this.currentSlide = carousel.slidesOutputData.startPosition;
      // console.log("next");
      let buttonElement = document.querySelector('.nav_active');
      $(buttonElement.nextSibling).addClass('nav_active');
      $(buttonElement).removeClass('nav_active');
      if (buttonElement.nextSibling.nextSibling.textContent == "") {
        this.rightButtonEnabled = true;
      } else{
        this.rightButtonEnabled = false;
      }
      this.leftButtonEnabled = true;

    }
    if(carousel.slidesOutputData.startPosition < this.currentSlide) {
      // console.log("prev")
      this.currentSlide = carousel.slidesOutputData.startPosition;
      let buttonElement = document.querySelector('.nav_active');
      $(buttonElement.previousSibling).addClass('nav_active');
      $(buttonElement).removeClass('nav_active');
      if (buttonElement.previousSibling.previousSibling) {
        this.leftButtonEnabled = true;
      } else{
        this.leftButtonEnabled = false;
      }
      this.rightButtonEnabled = true;
    }
  }

  currentImgSlide(i){
    return`slide-${i+1}`;
  }



   ngAfterViewInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.


      let w = document.querySelectorAll('.carousel_nav button');

      function makeActive(index) {
        for (let i = 0; i < w.length; i++) {
          if (i == index) {
            w[i].classList.add('nav_active');
          } else {
            w[i].classList.remove('nav_active');
          }
        }
      }
      for (let i = 0; i < w.length; i++) {
        w[i].addEventListener('click', () => {
          //  console.log(w[i].nextSibling)
          // $('.owl-carousel').trigger('to.owl.carousel', [i, 300]);
          // owlCar.to('slide-2')
          makeActive(i);
          let buttonElement = document.querySelector('.nav_active');
          if (buttonElement.previousSibling) {
            this.leftButtonEnabled = true;
          } else{
            this.leftButtonEnabled = false;
          }

          if (buttonElement.nextSibling.textContent == "") {
            this.rightButtonEnabled = true;
          } else{
            this.rightButtonEnabled = false;
          }

        });
      }




   }
}
