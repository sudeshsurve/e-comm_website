import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerPageComponent } from './components/seller-page/seller-page.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SellerComponent } from './components/seller/seller.component';
import { AuthGuard } from './seller-guard/auth.guard';

const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'seller-auth' , component:SellerComponent},
{path:'seller-page' , canActivate:[AuthGuard] , component:SellerPageComponent},
{path:'seller-add-product' , canActivate:[AuthGuard] , component:SellerAddProductComponent},
{path:'seller-update-product' , canActivate:[AuthGuard] , component:SellerUpdateProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
