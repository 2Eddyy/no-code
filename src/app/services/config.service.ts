import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  async getConfig() {
      try{
          const response:any = await firstValueFrom(this.http.get('/config'));
          if(response && response.status){
            environment["version"] = response["config"].version;
            environment["api_base_path"] = response["config"].billing_api;
            environment["platform_api_path"] = response["config"].platform_api_path;
          }
      }catch(e){
          console.error(e)
      }
      return environment;
  }
}
