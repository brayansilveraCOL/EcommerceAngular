import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeatNumberPipe'
})
export class RepeatNumberPipePipe implements PipeTransform {

  transform(productSelected: any, products: any[]): any {
    return products.filter((product) => productSelected.id === product.id).length;
   }

}
