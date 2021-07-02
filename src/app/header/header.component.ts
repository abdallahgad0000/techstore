import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoriesService } from '../get-categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchWord: any;
  categories: any;
  searchInput: any;
  test:Router;
  constructor(_GetCategoriesService: GetCategoriesService , _Router: Router) {
    _GetCategoriesService.getTest().subscribe((data) => {
      this.categories = data;
    });
    this.test = _Router
  }
  submit() {
    this.test.navigateByUrl(`/search/${this.searchWord}/1`);
  }

  ngOnInit() {
    this.searchInput = document.getElementById('header_search_input');
    this.searchInput.addEventListener('keyup', (aa, _Router: Router) => {
      if (aa.code == 'Enter') {
        this.submit()
      }
    });
  }
}
