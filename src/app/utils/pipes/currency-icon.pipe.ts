import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    let symbol = '';
    switch (value.toUpperCase()) {
      case 'USD':
        symbol = '<i class="fas fa-dollar-sign"></i>';
        break;
      case 'DOLLAR':
        symbol = '<i class="fas fa-dollar-sign"></i>';
        break;
      case 'INR':
        symbol = '<i class="fas fa-rupee-sign"></i>';
        break;
      case 'RUPEE':
        symbol = '<i class="fas fa-rupee-sign"></i>';
        break;
      default:
        symbol = value;
    }
    return symbol;
  }
}
