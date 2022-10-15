import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router : Router ,public addcart : AddToCartService , public p_servise :PServiceService ) { }
products :undefined | product []
allproduct :undefined | product[]
  ngOnInit(): void {

this.p_servise.popularproduct().subscribe((result)=>{
  this.products = result
})

this.p_servise.getproduct().subscribe((result)=>{
  this.allproduct = result
})
  }
  addtocart(item:product){ 
    console.log(item);
  this.addcart.addtocart(item)

  }

}
