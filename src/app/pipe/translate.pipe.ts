import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'money':
        return 'Dinero';
      case 'clothes':
        return 'Ropa';
      case 'food':
        return 'Comida';
      default:
        return value; 
    }
  }

}