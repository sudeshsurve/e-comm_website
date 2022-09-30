import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { sellerlogin, sellersignup } from 'src/app/data-type';
import { SellerService } from 'src/app/seller-auth/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  formdisplay:boolean  = false;
  errormsg :any =' '
  constructor(private seller:SellerService , private router : Router) { }

  ngOnInit(): void {
    this.seller.reload()
  }
  signUp(data:sellersignup){
    this.seller.seller_signup(data)
  }
  openlogin(){
    this.formdisplay = true
  }
  opensignup(){
    this.formdisplay= false
  }

  login(data:sellerlogin){
    console.log(data);
    this.seller.seller_login(data)
    this.seller.iserror.subscribe((err:any)=>{
      
      if(err){
        console.log(err);
       this.errormsg = 'Email and Passowrd incorrect'
      }
    })
  }
}
