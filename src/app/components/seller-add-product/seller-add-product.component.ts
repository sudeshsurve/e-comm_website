import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  @ViewChild('add_product') form!: NgForm
succesmsg:undefined |  string 
  obj : any={}
  p_list : any[] =[]
  constructor(private p_service: PServiceService , private router :Router , private activerout :ActivatedRoute) { }
  ngOnInit(): void {
  }
  onsubmit(){
this.p_service.addproduct(this.form.value).subscribe((res)=>{
  console.log(res);
  
if(res){
  this.succesmsg = 'Product Add Successful' 
}
})
setTimeout(() => {
  this.succesmsg = undefined
}, 3000);
this.form.reset()
  }

}
