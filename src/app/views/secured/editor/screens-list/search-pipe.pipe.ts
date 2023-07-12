import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(value: any,searchInput:any): any {
    if(searchInput==""){
      return value
    }
    else {
      return value.filter((item:any)=>{
        if((item.screenname).toLowerCase().includes(searchInput.toLowerCase())){
          return item.screenname
        }
       
      })
    }
    }
  }


