import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype :string ="default"
  sellerName :string =''
  constructor(private router : Router) { }

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
      }else{
        console.log('outside ');
        this.menutype = "default"
      }  
      }
     
    })
  }
  logout(){
    localStorage.removeItem('sellers')
  this.router.navigate(['seller-auth'])
    }
}
