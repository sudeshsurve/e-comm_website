import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/data-type';
import { PServiceService } from 'src/app/product/p-service.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
searchresult : undefined | product[]
  constructor(private rout : ActivatedRoute , public pservise : PServiceService) { }

  ngOnInit(): void {
  let query =   this.rout.snapshot.paramMap.get('query')
  console.log(query);
    query && this.pservise.autofilter(query).subscribe((res: product[])=>{
this.searchresult = res
console.log(res);

    })
  }

}
