import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'myMoment'
})
export class MomentPipe implements PipeTransform {

  transform(value: number): string {
    let res = moment(value).format('DD/MM/YYYY hh:mm A');
    return res;
  }
}
