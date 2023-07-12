import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'elementsearch',
})
export class ElementSearch implements PipeTransform {
  filtered: any;
  constructor() {}

  transform(value_1: any, search: any): any {
    if (search ==  undefined||'' ) {
      
      this.filtered = value_1;
      return value_1;
    } else {
      this.filtered = value_1.filter((items: any) => {
        
        if (items.label.toLowerCase().includes(search.toLowerCase())) {
          return items.label;
        } 

      });
    }
    return this.filtered;
  }
}
