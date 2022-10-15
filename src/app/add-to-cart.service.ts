import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  cartdatalist :any =[]
  productlist = new BehaviorSubject<any>([])
  constructor() { 
let Is : any = this.getdata()
  if(Is)this.productlist.next(Is)


  }
getProductData(){
  return this.productlist
}
  
setproduct(product:any)
{
  this.cartdatalist.push(...product)
  this.productlist.next(product)
}
addtocart(product:any){
const Is = this.getdata()
if(Is){
  this.productlist.next(Is)
}
let exist :product;

if(Is){
   exist = Is.find((x:product)=>{
    return product.id == x.id
})
}
  if(exist){
    if(exist.qty == 2){
      alert(`you can buy ${product.p_name} only (${exist.qty})unit`)
      return
    }
    exist.qty++   
  }
  else{
    if(Is){
        const newdata = [...Is , product]
        this.setcartdata(newdata)
        this.productlist.next(this.getdata())
    }
    this.cartdatalist.push(product)
    this.setcartdata(this.cartdatalist)
    this.gettotal()
  }
}

getdata(){
return JSON.parse(localStorage.getItem('cart'))
}

setcartdata(data:any){
localStorage.setItem('cart' ,JSON.stringify(data))
this.productlist.next(this.getdata())
}

removeproduct(product:any){
    this.cartdatalist.map((a:any , index:any)=>{
   if(product.id == a.id){
    this.cartdatalist.splice(index , 1)
   }
  })  
  
 
  this.productlist.next(this.cartdatalist)
    this.setcartdata(this.cartdatalist)
}


gettotal(){
  let total = 0
  this.cartdatalist.map((a)=>{
   total += a.p_prize
  })  
  return total
}



}
