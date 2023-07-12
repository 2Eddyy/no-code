import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parsePipe'
})
export class ScreensListPipe implements PipeTransform {
  srcDocContent:any
  transform(value:any): any {
    return JSON.parse(value) as HTMLElement;
  }


}