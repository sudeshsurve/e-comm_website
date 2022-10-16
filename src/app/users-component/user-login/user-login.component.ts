import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  formdisplay  : boolean = false
  constructor(private userservise : UserAuthService) { }
  errormsg :undefined | string 
  ngOnInit(): void {
    this.userservise.reload()
  }


  User_signUp(data:any){
    this.userservise.signup(data)


  }

  user_login(data:any){
  // console.log(data);
  this.userservise.user_get(data)
  this.userservise.iserror.subscribe((res)=>{
    if(res){
      this.errormsg = "please check email & password"
    }
  })

  }

  openlogin(){
this.formdisplay = true
  }

  opensignup(){
this.formdisplay = false
  }
 
}
