import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.component.html',
  styleUrls: ['./notfoundpage.component.scss']
})
export class NotfoundpageComponent implements OnInit {


  constructor(private titleService:Title) {
    this.titleService.setTitle("Techstore | Page Not Found");
   }

  ngOnInit(): void {
  }

}
