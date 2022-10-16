import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { product } from 'src/app/data-type';
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
    this.router.events.subscribe((val:any)=>{
      if(val.url){
       if(localStorage.getItem('sellers') && val.url.includes('seller')){
        let data = JSON.parse(localStorage.getItem('sellers')|| '')
        let s_data = data[0].name
        this.sellerName = s_data
        // console.log(this.sellerName);
        
        // console.log(this.sellerName);
        this.menutype= "seller"
      }
      else if(localStorage.getItem('user')){
           let userdata = localStorage.getItem('user')
           let userstore =userdata &&  JSON.parse(userdata )[0]
           this.username = userstore.name
          this.menutype = "user"
      }
      
      else{
        // console.log('outside ');
        this.menutype = "default"
      }  
      }
     
    })
    this.addcart.getProductData().subscribe((res:any)=>{
      // console.log(res);
      
   this.totalcount =  res.length
    })
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
        console.log(res);
         if(res.length < 5){
          this.searchproduct = res
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
    }

}
