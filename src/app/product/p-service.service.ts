import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class PServiceService {
  products : product[] =[]

  constructor(private http : HttpClient) { }

addproduct(data:product){
  return this.http.post('http://localhost:3000/product', data)
}

getproduct(){
  return this.http.get<product[]>('http://localhost:3000/product')
}


remove(id:any){
  return this.http.delete('http://localhost:3000/product/' + id)
}

getsingleproduct(id:any){
  return this.http.get('http://localhost:3000/product/' + id)
}

updateproduct(id:any , body:any){
  return this.http.put('http://localhost:3000/product/' + id , body)
}

}
