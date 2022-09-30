import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { sellerlogin, sellersignup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
   islogedin = new BehaviorSubject<boolean>(false)
   iserror = new EventEmitter<boolean>(false)
  constructor(private http : HttpClient , private router:Router) { }

  seller_signup(data:sellersignup){
    this.http.post('http://localhost:3000/sellaer' , data ,{observe:'response'}).subscribe((res=>{
  this.islogedin.next(true)
  localStorage.setItem('sellers' , JSON.stringify(res.body))
  this.router.navigate(['seller-page'])
    }))
  }

  reload(){
    if(localStorage.getItem('sellers')){
      this.islogedin.next(true)
      this.router.navigate(['seller-page'])
    }
  }
seller_login(data:sellerlogin){
  this.http.get(`http://localhost:3000/sellaer?email=${data.email}&password=${data.password}` , {observe :'response'}).subscribe((res:any)=>{
  if(res && res.body && res.body.length){
    localStorage.setItem('sellers' , JSON.stringify(res.body))
    this.router.navigate(['seller-page'])
  }
  else{
    console.log('error');
this.iserror.emit(true)
  }  
  })
}

}
