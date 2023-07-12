import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-public.layout',
  templateUrl: './public.layout.component.html',
  styleUrls: ['./public.layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  public _subscription_user_data:any;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#eeeeee';
  }

  ngOnInit(): void {
    if(localStorage.getItem("userObj") != null){
      this.router.navigate(["/projects"]);
    };
  }
}
