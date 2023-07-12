import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatPipe'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const timestamp = new Date(value).getTime();
    const now = new Date().getTime();
    const diff = now - timestamp;

    const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

    if (diff >= 3600000) {
      const hours = Math.floor(diff / 3600000);
      return rtf.format(-hours, 'hour');
    } else if (diff >= 60000) {
      const minutes = Math.floor(diff / 60000);
      return rtf.format(-minutes, 'minute');
    } else {
      return rtf.format(-1, 'second');
    }
  }

}
