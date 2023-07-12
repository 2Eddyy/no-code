import { Injectable } from '@angular/core';
import { BoodskapService } from 'src/app/services/boodskap.services';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectController {
  constructor(private boodskapService: BoodskapService) {}

  private counterSubject = new Subject<number>();
  getlist:any=[]
  setMyData(data: any) {
    this.counterSubject.next(data.length);
  }

  getMyData() {
    return this.counterSubject.asObservable();
  }

  getProjectsList(cbk: any) {
    this.boodskapService.getDomainProperty(`project.details`).subscribe({
      next: (res) => {
        cbk(true, res);
      },
      error: (err) => {
        cbk(false, err);
      },
      complete: () => {},
    });
  }

  uploadFileFn(data: any, cbk: any) {
    this.boodskapService.uploadFile(data).subscribe({
      next: (res) => {
        cbk(true, res);
      },
      error: (err) => {
        cbk(false, err);
      },
      complete: () => {},
    });
  }
}
