import { HttpBackend, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  iserror = new EventEmitter<boolean>(false)
  constructor(private http :HttpClient , private router : Router) { }

  signup(body:any){

 this.http.post('http://localhost:3000/users' , body , {observe :'response'}).subscribe((res)=>{
    localStorage.setItem('user' , JSON.stringify(res.body))
      this.router.navigate(['/'])
 })
  }

  user_get(data:any){
    this.http.get(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`, {observe:'response'}).subscribe((res:any)=>{
    if(res && res.body && res.body.length){
        localStorage.setItem('user' , JSON.stringify(res.body))
        this.router.navigate(['/'])
      }else{
        this.iserror.emit(true)
      }
      
    })
  }

reload(){
 if(localStorage.getItem('user')) {
   this.router.navigate(['/'])  

 }
}

}
