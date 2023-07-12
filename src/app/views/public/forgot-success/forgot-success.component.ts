import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/services/commondata.service';
CommonDataService

@Component({
  selector: 'app-forgot-success',
  templateUrl: './forgot-success.component.html',
  styleUrls: ['./forgot-success.component.css']
})
export class ForgotSuccessComponent implements OnInit {
  webVersion:string=""
constructor(private _commonDataService: CommonDataService ){

}

ngOnInit(): void {
  this._commonDataService.config$.subscribe((config: any) => {
      
      this.webVersion =config.version
      
    });
  }


}
