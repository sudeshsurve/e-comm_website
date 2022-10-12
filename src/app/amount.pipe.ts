import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number, count :number , decimal : number ): any {
 return( value * count ).toFixed(decimal)
  }

}
