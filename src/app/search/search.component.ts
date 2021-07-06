import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GetCategoriesService } from '../get-categories.service';

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

  constructor( _GetCategoriesService : GetCategoriesService,_Router:Router,_ActivatedRoute:ActivatedRoute ,_ApiService:ApiService) {
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });


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
              this.currentPage = 1;
              $('#preLoaderContainer svg').fadeOut(100)
              $('#preLoaderContainer').fadeOut(300)
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


  ngOnInit() {

    // $(location.href).on("hashchange",function(){console.log("aaa")})
    // window.addEventListener("hashchange",()=>{console.log("jhj")})

    $(".product_fav").click(function(){
      $(this).children().css("color","green");
    })
  }

}
