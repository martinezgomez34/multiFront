import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate2',
  standalone: true
})
export class Translate2Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'comunity_center':
        return 'Centro Comunitario';
      case 'food_bank':
        return 'Banco de Alimento';
      case 'childrens_shelters':
        return 'Casa Hogar';
      default:
        return value; 
    }
  }

}

