import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router : Router ,public p_servise : PServiceService) { }
products :undefined | product []
  ngOnInit(): void {

this.p_servise.getproduct().subscribe((result)=>{
  console.log(result);
  this.products = result
})

  }

}
