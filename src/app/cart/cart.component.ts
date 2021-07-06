import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
declare let $:any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartServiceService : CartServiceService) {

  }
  cart:any = this._CartServiceService.cart;
  totalPrice = this._CartServiceService.totalPrice();
  deleteFromCart(item){
    this._CartServiceService.setItem(item)
  }
  
  validateInputs(){
    this.validateNameInput();
    this.validateEmailInput();
    this.validateEmailPhone();
    this.validateEmailAddress();
    if(this._CartServiceService.cart = []) {
      $('#modalError').modal()
    } else {
      if(this.validateNameInput() && this.validateEmailInput() && this.validateEmailPhone() && this.validateEmailAddress()){
        this._CartServiceService.submitCart();
        $('#exampleModal').modal()
      }
    }
  }
  // validate name input
  validateNameInput(){
    let userNameValid:boolean;
    userNameValid = /^[a-zA-Z\s]+$/.test($("#contact_form_name").val());
    if (userNameValid == true) {
      $("#checkIconName").css({"visibility":"visible"});
      $("#validateAlertName").css({"display":"none"});
      return true;
    } else {
      $("#checkIconName").css({"visibility":"hidden"});
      $("#validateAlertName").css({"display":"block"});
      return false;
    }
  }

  // validate email input
  validateEmailInput(){
    let userEmailValid:boolean;
    userEmailValid = /^[a-zA-Z0-9\._-]{1,}@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test($("#contact_form_email").val());
    if (userEmailValid == true) {
      $("#checkIconEmail").css({"visibility":"visible"});
      $("#validateAlertEmail").css({"display":"none"});
      return true;
    } else {
      $("#checkIconEmail").css({"visibility":"hidden"});
      $("#validateAlertEmail").css({"display":"block"});
      return false;
    }
  }

   // validate phone input
   validateEmailPhone(){
    let userPhoneValid:boolean;
    userPhoneValid = /^(\+2|002|02|2)?01[0125][0-9]{8}$/.test($("#contact_form_phone").val());
    if (userPhoneValid == true) {
      $("#checkIconPhone").css({"visibility":"visible"});
      $("#validateAlertPhone").css({"display":"none"});
      return true;
    } else {
      $("#checkIconPhone").css({"visibility":"hidden"});
      $("#validateAlertPhone").css({"display":"block"});
      return false;
    }
  }

   // validate address input
   validateEmailAddress(){
    let userAddressValid:boolean;
    userAddressValid = /^.{1,}/.test($("#contact_form_message").val());
    if (userAddressValid == true) {
      $("#checkIconAddress").css({"visibility":"visible"});
      $("#validateAlertAddress").css({"display":"none"});
      return true;
    } else {
      $("#checkIconAddress").css({"visibility":"hidden"});
      $("#validateAlertAddress").css({"display":"block"});
      return false;
    }
  }


  
  ngOnInit() {
    setInterval(()=>{
      this.totalPrice = this._CartServiceService.totalPrice();
    },100)
  }

}
