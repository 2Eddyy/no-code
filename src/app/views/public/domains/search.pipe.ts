import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serach'
})
export class SearchPipe implements PipeTransform {

  transform(value:any,searchBox:any): any {
  if(searchBox==""){
    return value
  }
  else {
    return value.filter((item:any)=>{      
      if((item.domainKey).toLowerCase().includes(searchBox.toLowerCase())){
        return item.domainKey
      }
    })
  }
  }
}
