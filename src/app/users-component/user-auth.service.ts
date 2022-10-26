import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  iserror = new EventEmitter<boolean>(false)
  constructor(private http :HttpClient , private router : Router ) { }

  signup(body:any){

 this.http.post('http://localhost:3000/users' , body , {observe :'response'}).subscribe((res:any)=>{
    localStorage.setItem('user' , JSON.stringify(res.body[0]))
      this.router.navigate(['/'])
 })
  }

  user_get(data:any){
   return this.http.get(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`, {observe:'response'})
        // this.localdatatoRemotecart()/
    
  }

reload(){
 if(localStorage.getItem('user')) {
   this.router.navigate(['/'])  

 }
}



}
