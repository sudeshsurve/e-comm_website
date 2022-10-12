import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SellerComponent } from './components/seller/seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerPageComponent } from './components/seller-page/seller-page.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';

import { SearchProductComponent } from './components/search-product/search-product.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { AmountPipe } from './amount.pipe';
import { TotalAmountPipe } from './total-amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerComponent,
    SellerPageComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchProductComponent,
  AddCartComponent,
  ProductdetailsComponent,
  AmountPipe,
  TotalAmountPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  HttpClientModule,
  NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
