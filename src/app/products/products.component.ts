import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { GetCategoriesService } from '../get-categories.service';

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
  constructor(
    _TestService: TestService,
    _ActivatedRoute: ActivatedRoute,
    _GetCategoriesService: GetCategoriesService,
    _Router: Router
  ) {
    this.page = _ActivatedRoute.snapshot.paramMap.get('page');
    _TestService.getTest(this.page).subscribe((data) => {
      if (! data['products'][0]) {
        _Router.navigateByUrl('/notfoundpage');
      } else {
        this.posts = data;
        this.lastPage = data['pages'].length;
      }
    });
    this.test = _TestService;
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });
  }
  nn(page) {
    this.test.getTest(page).subscribe((data) => {
      if (! data['products'][0]) {
        let _Router:Router;
        _Router.navigateByUrl('/notfoundpage');
      } else {
        this.posts = data;
        this.lastPage = data['pages'].length;
      }
    });
    this.page = page;
  }

  ngOnInit() {
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
