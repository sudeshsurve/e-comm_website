import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  @ViewChild('update_product') form! : NgForm
  succesmsg: undefined | string
  obj :any= {}
  constructor(private pservice : PServiceService, private router : ActivatedRoute , private rout :Router) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((res)=>{
      // let id = res.id  
      this.obj = res
      this.pservice.getsingleproduct(this.obj.id).subscribe((x:any)=>{
          this.form.setValue({
            p_name:x.p_name,
            p_color:x.p_color,
            p_prize:x.p_prize,
            p_description:x.p_description,
            p_img:x.p_img,
          })
      })
    })
    // this.pservice.getsingleproduct()


  }
  onsubmit(){
 if(this.form.value){
  this.pservice.updateproduct(this.obj.id , this.form.value).subscribe((res)=> {
  if(res){
    this.succesmsg = 'Update Successful'
  }
    
  })
 }
//  this.form.reset()
 setTimeout(() => {
  this.succesmsg =  undefined
  this.rout.navigate(['/seller-page'])
 }, 2000);
  
 
  }
}
