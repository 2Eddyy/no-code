import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingIndicatorService } from '../services/loading-indicator.service';

@Directive({
  selector: '[appLoadingIndicator]'
})
export class LoadingIndicatorDirective implements OnInit, OnDestroy {
  private loadingSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private loadingService: LoadingIndicatorService
  ) {}

  ngOnInit() {

    this.loadingSubscription = this.loadingService.loading$.subscribe(
      loading => {
        console.log(loading);
        

        if (loading.status) {
          this.el.nativeElement.classList.add('block-page');
        } else {
          this.el.nativeElement.classList.remove('block-page');
        }
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
