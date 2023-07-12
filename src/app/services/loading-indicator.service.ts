import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private loadingSubject = new BehaviorSubject<any>(false);
  loading$ = this.loadingSubject.asObservable();

  show(obj?:any) {
    let loadObj:any = {};

    if(obj){
        loadObj = {
            status : true,
            title : obj.title,
            subTitle : obj.subTitle
        };
    }else{
        loadObj = {
            status : true,
            title : "Loading...",
            subTitle : "Please wait for a moment"
        };
    }

    this.loadingSubject.next(loadObj);
  }

  hide() {
    this.loadingSubject.next({
        status : false,
        title : '',
        subTitle : ''
    });
  }
}
