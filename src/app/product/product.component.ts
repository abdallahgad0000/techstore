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


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        // navigation: true,
    
        // slideSpeed: 300,
    
        // paginationSpeed: 400,
    
        // singleItem: true,
    
        // pagination: false,
    
        // rewindSpeed: 500,
        margin: 0,
        nav:false,
        dots:false,
        itemElement:"div",
        center:true,
        loop: false,
        items: 1,
      });
    });
    let w =  document.querySelectorAll(".carousel_nav button")
    
    function nn(index) {
      for(let i=0 ;i<w.length;i++){
        if( i == index ){
          w[i].classList.add("nav_active");
        } else {
          w[i].classList.remove("nav_active");
        }
      }  
        
    }
    for(let i=0 ;i<w.length;i++){
      w[i].addEventListener("click",()=>{
        // console.log(w[i].nextSibling.nextSibling)
        $('.owl-carousel').trigger('to.owl.carousel',[i,300]);
        nn(i)
    
      })
    }  
    
    $('.right_button').click(function() {
      $('.owl-carousel').trigger('next.owl.carousel');
      let w =  document.querySelector(".nav_active")
    console.log(w.nextSibling)//previousSibling
    // w.nextSibling.nextSibling.classList.add("nav_active");
    // w.nextSibling.previousSibling.classList.remove("nav_active");
    })
    
    $('.left_button').click(function() {
      $('.owl-carousel').trigger('prev.owl.carousel');
      let w =  document.querySelector(".nav_active")
    console.log(w.previousSibling)//previousSibling
    // w.previousSibling.nextSibling.classList.remove("nav_active");
    // w.previousSibling.previousSibling.classList.add("nav_active");
    })
  }
}
