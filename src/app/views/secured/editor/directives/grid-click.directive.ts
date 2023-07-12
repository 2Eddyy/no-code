import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appGridClick]',
})
export class GridClickDirective {
  private clickData: any;
  @Input('dataSrc') set dataSrc(val:any) {
    this.clickData = val;
  }

  constructor() { }

  @HostBinding('style.cursor')
  cursor = 'pointer';

  @HostListener('click', ['$event'])
  clickEvent(event:any) {

  }
}
