import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerPageComponent } from './components/seller-page/seller-page.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SellerComponent } from './components/seller/seller.component';
import { AuthGuard } from './seller-guard/auth.guard';
import { UserLoginComponent } from './users-component/user-login/user-login.component';

const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'seller-auth' , component:SellerComponent},
{path:'seller-page' , canActivate:[AuthGuard] , component:SellerPageComponent},
{path:'add-cart' ,  component:AddCartComponent},
{path:'user-login' ,  component:UserLoginComponent},
{path:'serach-product/:query' , component:SearchProductComponent},
{path:'product-details/:query' , component:ProductdetailsComponent},
{path:'seller-add-product' , canActivate:[AuthGuard] , component:SellerAddProductComponent},
{path:'seller-update-product' , canActivate:[AuthGuard] , component:SellerUpdateProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
