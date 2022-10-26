import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { cart, product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  formdisplay  : boolean = false
  constructor(private userservise : UserAuthService, private p_servise :PServiceService , private router : Router , private addtocart : AddToCartService) { }
  errormsg :undefined | string 
  ngOnInit(): void {
    this.userservise.reload()
  }


  User_signUp(data:any){
    this.userservise.signup(data)


  }

  user_login(data:any){
  // console.log(data);
  this.userservise.user_get(data).subscribe((res:any)=>{
    if(res && res.body && res.body.length){
        localStorage.setItem('user' , JSON.stringify(res.body[0]))
        this.localdatatoRemotecart()
        this.router.navigate(['/'])
        // this.p_servise.getcartproduts().subscribe()
    }
  })

  }
  
  openlogin(){
this.formdisplay = true
  }

  opensignup(){
this.formdisplay = false
  }
 

  localdatatoRemotecart(){
    // console.log('user login');
    let user = localStorage.getItem('user')
    let userId = JSON.parse(user)[0]
    let data = localStorage.getItem('cart')
    if(data){
      let cartdata:product[] = JSON.parse(data)
      cartdata.forEach((item:product , index) => {
        let cartvalue:cart={
        ...item ,
        productID: item.id,
        userId: userId.id
       }
       delete cartvalue.id
      setTimeout(() => {
        this.p_servise.addtocartapi(cartvalue).subscribe((res) => {
         if(res){
          console.log('success');
         }
       })
       if(cartdata.length == index+1 ){
         localStorage.removeItem('cart')
       }
      }, 500);
      });
// if(user){
//       this.p_servise.getcartproduts().subscribe((res:any)=>{
//         let cartdata = res.body
//         let data = cartdata.filter((item:cart)=> item.userId == userId.id)
//         this.addtocart.productlist.next(data)
//      }) 
//     }
    }
   
    
      }
}
