import { ActivatedRoute ,Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GetCategoriesService } from '../get-categories.service';

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
  constructor(
    _GetCategoriesService: GetCategoriesService,
    _ApiService: ApiService,
    _ActivatedRoute: ActivatedRoute,
    _Router:Router
  ) {
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
        } else {
          _Router.navigateByUrl('/notfoundpage')
        }
      });

      _Router.events.subscribe((event:Event)=>{
        if(event instanceof NavigationStart) {

        }
        if(event instanceof NavigationEnd) {

            this.currentCategory = _ActivatedRoute.snapshot.paramMap.get("id");
            this.currentPage = _ActivatedRoute.snapshot.paramMap.get("page")

            _ApiService.getProductByCategory(this.currentCategory,this.currentPage).subscribe((data) => {

              if (!data.msg){
                this.products = data;
                this.lastPage = data['pages'].length;
                } else {
                  _Router.navigateByUrl('/notfoundpage')
                }

            });

        }
      })
  }


  ngOnInit() {}
}