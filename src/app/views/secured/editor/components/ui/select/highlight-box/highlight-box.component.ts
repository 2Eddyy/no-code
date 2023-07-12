import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-highlight-box',
  templateUrl: './highlight-box.component.html',
  styleUrls: ['./highlight-box.component.scss']
})
export class HighlightBoxComponent implements OnInit {
  public bounds = {
    name: '',
    type: '',
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    display: 'none'
  };

  @Input() set boundBox(box:any) {
    this.bounds = box;
  }
  constructor() { }

  ngOnInit() {
  }

  public setBounds(val:any) {
    this.bounds = {
      ...val
    };
  }
}
