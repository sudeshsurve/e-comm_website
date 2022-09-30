import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {

  // products : undefined | product[]
  p_length :any
  deletemsg :undefined | string
  constructor(private router :Router , public p_service: PServiceService) { }

  ngOnInit(): void {
this.productlist()
  }

  remove_product(id:any){
  this.p_service.remove(id).subscribe((res)=>{
  if(res){
this.deletemsg = 'Product delete successful'
  }
this.productlist()
  })
    setTimeout(() => {
      this.deletemsg = undefined
    }, 3000);
  }
 
  productlist(){
    this.p_service.getproduct().subscribe((result)=>{
      this.p_service.products = result
      this.p_length = this.p_service.products.length
      })
  }
}
