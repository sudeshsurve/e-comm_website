import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { cart, product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype :string ="default"
  sellerName :string =''
  searchproduct : undefined | product[]
  totalcount:number = 0
  username :string = ''
  constructor(private router : Router , private pservise : PServiceService ,public addcart : AddToCartService) { }

  ngOnInit(): void {

    let userdata = localStorage.getItem('user')
    let userstore =userdata &&  JSON.parse(userdata )[0]
    this.router.events.subscribe((val:any)=>{
      if(val.url){
       if(localStorage.getItem('sellers') && val.url.includes('seller')){
        let data = JSON.parse(localStorage.getItem('sellers')|| '')
        let s_data = data[0].name
        this.sellerName = s_data
        this.menutype= "seller"
      }
      else if(localStorage.getItem('user')){
           let userdata = localStorage.getItem('user')
           let userstore = userdata && JSON.parse(userdata)
           this.username = userstore.name          
          this.menutype = "user"
          this.pservise.getcartproduts().subscribe((res:any)=>{
            if(res && res.body && res.body.length){
             let data = res.body
              let cartdata = data.filter((item:cart)=> item.userId == userstore.id)
              this.addcart.productlist.next(cartdata)
            }
         })
         this.addcart.getProductData().subscribe((res:any)=>{
          this.totalcount =  res.length
           })
      }
      
      else{
        this.menutype = "default"

        
      }  
    }
    
  })
  
 if(!userdata){
  this.addcart.getProductData().subscribe((res:any)=>{
 this.totalcount =  res.length
  })
}
  
 
  


  }
  logout(){
    localStorage.removeItem('sellers')
  this.router.navigate(['seller-auth'])
    }
    autofill(query:KeyboardEvent){
    if(query){
      const elemnt = query.target as  HTMLInputElement
      console.log(elemnt.value)
      this.pservise.autofilter(elemnt.value).subscribe((res:product[])=>{
        // console.log(res);
        if(res.length > 5){
           res.length = 5
          // this.searchproduct = res
         }
        this.searchproduct = res
      })  
    }
    }
    searchdisable(){
      this.searchproduct = undefined
    }
    search_product(val:string){
      if(val){
        this.router.navigate([`serach-product/${val}`])
      }
    }
    redirection(id:number){
      this.router.navigate(['/product-details/' + id])
    }

    user_logout(){
      localStorage.removeItem('user')
      this.router.navigate(['/user-login'])
      this.addcart.productlist.next([])
    }

}
