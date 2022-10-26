import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { cart, product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  add_or_remove :boolean =false
  product :undefined | product
  p_count : number = 1
  removecartid : product | undefined
  constructor(private router :ActivatedRoute , public p_servise : PServiceService , private  add_tocart: AddToCartService) { }

  ngOnInit(): void {
 let p_id = this.router.snapshot.paramMap.get('query')
 p_id && this.p_servise.getsingleproduct(p_id).subscribe((res)=>{
  this.product = res
 })

 let localcart = localStorage.getItem('cart')
 let localuser = localStorage.getItem('user')
 if(localcart && p_id){
   let data  =  JSON.parse(localcart)
    let items = data.filter((item:product)=> item.id.toString() == p_id)
    if(items.length){
      this. add_or_remove = true
    }else{  
      this. add_or_remove = false
    }
 }

 else if(localuser && p_id){
  let userid  = JSON.parse(localuser)
  this.p_servise.getcartproduts().subscribe((res:any)=>{
    if(res && res.body && res.body.length){
      let data = res.body
      let item = data.filter((item:any)=>item.productID == p_id && item.userId == userid.id)
      if(item.length){
        this.removecartid = item
        this. add_or_remove = true
      }
      else{
        this. add_or_remove = false
      }
      
    }

    
  })
 }

  }

  addtocart(item:product){
    let user = localStorage.getItem('user')
    let userID = user && JSON.parse(user)
    if (!localStorage.getItem('user')) {
      this.add_tocart.AddToCart(item)
      this.add_or_remove = true
    }
    else {
      let cartdata: cart = {
        ...item,
        userId: userID.id,
        productID: item.id
      }
      delete cartdata.id
        this.p_servise.addtocartapi(cartdata).subscribe((res) => {
          if (res) {
            this.add_or_remove = false
            this.p_servise.getcartproduts().subscribe((res:any)=>{
              let data = res.body.filter((item :cart)=> item.userId == userID.id)
              this.add_tocart.productlist.next(data)
               this.add_or_remove = true
                alert('product add successfully')

          //  this.addcart.productlist.next(data)
           })
          }
        })
      



      // this.p_servise.getproductdata(cartdata.productID).subscribe((res: any) => {
      //   if (res && res.body && res.body.length) {     
      //     console.log(res.body);  
      //    let obj =  res.body[0]
      //    if(obj){
      // this.p_servise.getcartproduts().subscribe((res:any)=>{
      //   let data = res.body
      //   // console.log(data);
      //   let iscartdata = data.find((item:cart)=> item.userId == userID.id && item.productID == obj.productID)
      //   if(iscartdata){
      //     this.add_or_remove = true
      //     alert(`${iscartdata.p_name} product is already in your cart`)
      //   }
      //   // console.log(cartdata)
      //  else if(!iscartdata){
      //     this.p_servise.addtocartapi(cartdata).subscribe((res) => {
      //       if (res) {
      //         this.add_or_remove = true
      //        this.p_servise.getcartproduts().subscribe((res:any)=>{
      //         let data = res.body.filter((item :cart)=> item.userId == userID.id)
      //        this.add_tocart.productlist.next(data)
      //        alert('product add successfully')
      //        })
      //       }
      //     })  
      //   }
      // })
      //    }
          
        
      //   }
        
      // })



    }
  }

removetocart(id:number){
  let localcartdata = localStorage.getItem('user')
  if(!localcartdata){
    console.log("localcart");
    this.add_tocart.removeproduct(id)
    this.add_or_remove = false
  }else{
    console.log(this.removecartid[0].id);
    let userid = JSON.parse(localcartdata)
          this.p_servise.removeproductfromcart(this.removecartid[0].id).subscribe((res)=>{
            if(res && res.body){ 
                this.p_servise.getcartproduts().subscribe((res:any)=>{
                  let cartdata = res.body
                  let data = cartdata.filter((item :cart)=> item.userId == userid.id)
                  this.add_tocart.productlist.next(data)
                  this.add_or_remove = false
                })
              }
            
          })
  }
  
}

  

  plus(){
    if( this.product.qty ==  2){
      alert(`you can buy ${this.product.p_name} only (${this.product.qty})unit`)
      return
    }
    this.product.qty++
  } 
  
  minus(){
    this.product.qty--
    if( this.product.qty ==  1){
      // alert(`you can buy ${this.product.p_name} only (${this.product.qty})unit`)
      return
          }
  }

}
