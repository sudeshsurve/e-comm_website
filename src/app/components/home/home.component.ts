import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { cart, product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router: Router, public addcart: AddToCartService, public p_servise: PServiceService) { }
  products: undefined | product[]
  allproduct: undefined | product[]
  ngOnInit(): void {

    this.p_servise.popularproduct().subscribe((result) => {
      this.products = result
    })

    this.p_servise.getproduct().subscribe((result) => {
      this.allproduct = result
    })
  }
  addtocart(item: product) {
    
    let user = localStorage.getItem('user')
    let userID = user && JSON.parse(user)
    if (!localStorage.getItem('user')) {
      this.addcart.AddToCart(item)
    }
    else {
      let cartdata: cart = {
        ...item,
        userId: userID.id,
        productID: item.id
      }
      delete cartdata.id
      this.p_servise.getproductdata(cartdata.productID).subscribe((res: any) => {
        if (res && res.body && res.body.length) {     
          console.log(res.body);  
         let obj =  res.body[0]
         if(obj){
        this.p_servise.getcartproduts().subscribe((res:any)=>{
        let data = res.body
        console.log(data);
        let iscartdata = data.find((item:cart)=> item.userId == userID.id && item.productID == obj.productID)
        // console.log(cartdata)
        if(iscartdata){
          alert(`${iscartdata.p_name} product is already in your cart`)
        }
        if(!iscartdata){
          this.p_servise.addtocartapi(cartdata).subscribe((res) => {
            if (res) {
             this.p_servise.getcartproduts().subscribe((res:any)=>{
              let data = res.body.filter((item :cart)=> item.userId == userID.id)
             this.addcart.productlist.next(data)
             alert('product add successfully')
             })
            }
          })
        }
      })
         }
          
        
        }
        else {
          this.p_servise.addtocartapi(cartdata).subscribe((res) => {
            if (res) {
             this.p_servise.getcartproduts().subscribe((res:any)=>{
              let data = res.body.filter((item :cart)=> item.userId == userID.id)
             this.addcart.productlist.next(data)
             alert('product add successfully')
            //  this.addcart.productlist.next(data)
             })
            }
          })
        }
      })



    }
  }
}
