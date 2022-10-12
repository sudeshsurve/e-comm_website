import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product :undefined | product
  p_count : number = 1
  constructor(private router :ActivatedRoute , public p_servis : PServiceService , private  add_tocart: AddToCartService) { }

  ngOnInit(): void {
 let p_id = this.router.snapshot.paramMap.get('query')
 console.log(p_id);
 p_id && this.p_servis.getsingleproduct(p_id).subscribe((res)=>{
  console.log(res);
  this.product = res
 })

  }

  addtocart(item:product){
    this.add_tocart.addtocart(item)
  }

  plus(){
    if(this.p_count == 2){
      alert('you can add only  two product')
      return
          }
  this.p_count++
  }
  minus(){
  if(this.p_count == 1){
    return
  }
    this.p_count--
  }

}
