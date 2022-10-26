import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class PServiceService {
  products : product[] =[]
  cart :cart[] = []
  constructor(private http : HttpClient) { }


addproduct(data:product){
  return this.http.post('http://localhost:3000/product', data)
}

getproduct(){
  return this.http.get<product[]>('http://localhost:3000/product')
}

popularproduct(){
  return this.http.get<product[]>('http://localhost:3000/product?_limit=3')
}

remove(id:any){
  return this.http.delete('http://localhost:3000/product/' + id)
}

getsingleproduct(id:any){
  return this.http.get<product>('http://localhost:3000/product/' + id)
}

updateproduct(id:any , body:any){
  return this.http.put('http://localhost:3000/product/' + id , body)
}

autofilter(query:string){
  return this.http.get(`http://localhost:3000/product?q=${query}`)
}

addtocartapi(body:any){
  return this.http.post('http://localhost:3000/cart' , body)
}

getcartproduts(){
  return this.http.get('http://localhost:3000/cart' , {observe : 'response'})
}

getproductdata(productID:number){
// console.log(productID);

  return this.http.get(`http://localhost:3000/cart?productID=${productID}` , {observe :'response'})
}

addproductqty(productID:number , body :any){  
  return this.http.put('http://localhost:3000/cart/' + productID , body , {observe :'response'})
} 
  
removeproductfromcart(id:number){
  console.log(id)

  return this.http.delete('http://localhost:3000/cart/' + id , {observe :'response'})
}


} 