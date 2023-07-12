import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-square',
  templateUrl: './grid-square.component.html',
  styleUrls: ['./grid-square.component.scss']
})
export class GridSquareComponent implements OnInit {
  public square = {
    type: 'basic',
    backgroundType: '',
    colspan: 1,
    image: '',
    icon: '',
    label: 'Label',
    url: '',
    key: '',
    action: '',
    disabled: false,
    category: '',
  };
  public squareColor = '#fdfefe';

  @Input() set data(val:any) {
      this.square = val;
  }
  @Input() set color(val: string) {
      this.squareColor = val;
  }

  constructor() { }

  ngOnInit() {
  }

  public setImageSrc(img: string) {
    return `${img}`;
  }
}
