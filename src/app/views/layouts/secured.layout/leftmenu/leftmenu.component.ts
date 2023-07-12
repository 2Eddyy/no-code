import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss'],
  encapsulation : ViewEncapsulation.None

})
export class LeftmenuComponent implements OnInit {
  
  public visible = false;
  public leftMenuContainer:any;

  constructor() {}

  public toggle() {
    this.visible = !this.visible;
    return this.visible;
  }

  ngOnInit(): void {
  }
}
