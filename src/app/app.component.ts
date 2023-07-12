import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonDataService } from './services/commondata.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
      private configService: ConfigService,
      private _commonDataService : CommonDataService
    ) {
  }

  async ngOnInit() {

     let configData = await this.configService.getConfig();

     if(configData != null){
        environment.version = configData["version"];
        this._commonDataService.setConfigData(environment);
     }
  }
}
