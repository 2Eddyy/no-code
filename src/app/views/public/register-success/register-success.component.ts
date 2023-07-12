import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/services/commondata.service';


@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
  webVersion:string=""
  constructor(private _commonDataService: CommonDataService){}

  ngOnInit(): void {
    this._commonDataService.config$.subscribe((config: any) => {
  
      
      
      this.webVersion =config.version
      
    });
  }

}
