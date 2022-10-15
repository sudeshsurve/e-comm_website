import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { product } from 'src/app/data-type';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
 cartproduct : any[]=[]
//  allproduct:any 
 counter : number   
  constructor(private router : ActivatedRoute , public addtocart : AddToCartService) { }

  ngOnInit(): void {

this.addtocart.getProductData().subscribe(res=>{
  this.cartproduct = res
  // this.allproduct =  this.addtocart.gettotal()
  // console.log(this.allproduct)
  if(this.cartproduct){
this.gettotal(this.cartproduct)
  }
})
  }

  remove(product:any){
    this.addtocart.removeproduct(product)
    this.gettotal(this.cartproduct)
  }


  decriment(product:product){
    let result = this.cartproduct.find((x)=>{
return product.id == x.id
    })
    if(result){
      if(result.qty == 1){
        return
      }
      result.qty--
    this.gettotal(this.cartproduct)

      // this.allproduct -= result.p_prize
    }
   
  }

  incriment(product:product){
    let result = this.cartproduct.find((x)=>{
      return product.id == x.id
          })
          if(result){
            if(result.qty == 2){
              alert('you can buy only two product')
              return  
            }
            result.qty++
    this.gettotal(this.cartproduct)

          
            // this.allproduct += result.p_prize
          }
        
        
  }

  gettotal(data:any){
  let num = 0
for(let item of data)  {
  num += item.p_prize * item.qty
}
this.counter = num
}
   
    
  }


//  validation(){
//   if(this.counter == 2){
//     alert('you can add only two product')
//   }
//  }
 



