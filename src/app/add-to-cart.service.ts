import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, find, ignoreElements } from 'rxjs';
import { product } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  cartdatalist: any = []
  count: undefined | number
  productlist = new BehaviorSubject<any>([])

  constructor(private http: HttpClient) {
    let Is: product[] = this.getlocaldata()
    if (Is) this.productlist.next(Is)

  }




  getProductData() {
    return this.productlist.asObservable()
  }

  // setproduct(product:any)
  // {
  //   this.cartdatalist.push(product)
  //   this.productlist.next(this.cartdatalist)
  // }



  // addtocart(product:product){
  // const Is = this.getdata()
  // if(Is){
  //   this.productlist.next(Is)
  // }
  // let exist :product;

  // if(Is){
  //    exist = Is.find((x:product)=>{
  //     return product.id == x.id
  // })
  // }
  //   if(exist){
  //     if(exist.qty == 2){
  //       alert(`you can buy ${product.p_name} only (${exist.qty})unit`)
  //       return
  //     }
  //     exist.qty++   
  //   }
  //   else{
  //     if(Is){
  //         const newdata = [...Is , product]
  //         this.setcartdata(newdata)
  //         this.productlist.next(this.getdata())
  //     }
  //     this.cartdatalist.push(product)
  //     this.setcartdata(this.cartdatalist)
  //   }
  // }

  // getdata(){
  // return JSON.parse(localStorage.getItem('cart'))
  // }

  // setcartdata(data:any){
  // localStorage.setItem('cart' ,JSON.stringify(data))
  // this.productlist.next(this.getdata())

  // }


  getlocaldata() {
    return JSON.parse(localStorage.getItem('cart'))
  }



  AddToCart(product: product) {

    let products = this.getlocaldata()
    if (products) {
      this.productlist.next(products)
    }
    if (products) {
      let exist = products.find((res) => {
        return res.id == product.id
      })
      if (exist) {
        alert("product already in your cart")
      }
      else {
        this.cartdatalist.push(product)
        localStorage.setItem('cart', JSON.stringify(this.cartdatalist))
        this.productlist.next(this.getlocaldata())
        alert('product added successfully')
      }
    }
    else {
      this.cartdatalist.push(product)
      localStorage.setItem('cart', JSON.stringify(this.cartdatalist))
      this.productlist.next(this.getlocaldata())
      alert('product added successfully')
    }
  }

  removeproduct(id: number) {
    let cartdata = localStorage.getItem('cart')
    if (cartdata) {
      let data = JSON.parse(cartdata)
      this.cartdatalist = data
      let data1 = this.cartdatalist.findIndex((item: product) => item.id == id)
      this.cartdatalist.splice(data1, 1)
      localStorage.setItem('cart', JSON.stringify(this.cartdatalist))
      this.productlist.next(this.getlocaldata())
    }
  }






}


