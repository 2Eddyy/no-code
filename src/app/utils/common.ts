import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Common {

    static formatNumber(num:number) {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Billion';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Million';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
      }
  
    static callback(){
        return "";
    }
}