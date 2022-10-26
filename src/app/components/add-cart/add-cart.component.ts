import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { cart, product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
 cartproduct :any[] =[]
//  allproduct:any 
 counter : number   
  constructor(private router : ActivatedRoute , public addtocart : AddToCartService , public p_servise : PServiceService) { }

  ngOnInit(): void {
// console.log(this.cartproduct);
// this.cartproductdata()
this.addtocart.getProductData().subscribe((res)=>{
 this.cartproduct = res
  this.gettotal(this.cartproduct)
})
let userdata = localStorage.getItem('user')
if(userdata){
  let user = JSON.parse(userdata)
 this.p_servise.getcartproduts().subscribe((res:any)=>{
  if(res && res.body && res.body.length){
    let cartdata = res.body
  let data = cartdata.filter((item:cart)=> item.userId == user.id)
  console.log(data);
  if(data.length){
    this.addtocart.productlist.next(data)
  this.gettotal(data)
  }
    
    // let data = res.body.filter((item:cart )=> item.userId == user.id)
    
  }
 }) 
}

if(!userdata){
  this.addtocart.getProductData().subscribe(res=>{
  if(res){
    this.cartproduct = res
this.gettotal(this.cartproduct)
  }
})
}



  }

  remove(id:number){
    let localcartdata = localStorage.getItem('user')
    if(!localcartdata){
      console.log("localcart");
      this.addtocart.removeproduct(id)
    }else{
      console.log(id);
      
      let userid = JSON.parse(localcartdata)
      this.p_servise.removeproductfromcart(id).subscribe((res)=>{
        if(res && res.body){
          this.p_servise.getcartproduts().subscribe((res:any)=>{
            let cartdata = res.body
            let data = cartdata.filter((item :cart)=> item.userId == userid.id)
            this.addtocart.productlist.next(data)
          })
        }
      
      })
    }
    
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
              alert(`you  buy  ${product.p_name} only ${result.qty} product`)
              return  
            }
            result.qty++
    this.gettotal(this.cartproduct) 
        // this.allproduct += result.p_prize
          } 
  }


  // cartproductdata(){  
  //     this.p_servise.getcartproduts().subscribe((res:any)=>{
  //     if(res && res.body){
  //      this.addtocart
  //     }
  //     })
  // }

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
 



