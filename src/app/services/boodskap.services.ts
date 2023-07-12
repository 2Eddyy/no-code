import { Router } from '@angular/router';
import { UserDataService } from './../services/userdata.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { CommonDataService } from './commondata.service';
import { ScreenModel } from '../models/ScreenModel';
class ApiResponse {
  constructor(
    public status: Boolean, 
    public result: any) {}
}

@Injectable({
  providedIn: 'root',
})

export class BoodskapService {

  private PLATFORM_API_PATH = environment.platform_api_path;
  private httpOptions:any;
  private atoken:string = "";
  private userObj:any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private _commonDataService: CommonDataService) {

    this._commonDataService.user$.subscribe(value => {
      this.atoken = value.token;
      this.userObj = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'TOKEN': this.atoken
        })
      };
    });

    this._commonDataService.config$.subscribe(value => {
      this.PLATFORM_API_PATH = environment.platform_api_path;
    });
  }

  //=========================================
  //Domain APIs
  //=========================================
  // 

  loginAsAnotherDomainAPI(adminUsername:string, adminPwd:string, userDomainKey:string, userEmail:string): Observable<any> {
    let httpOptions = this.httpOptions;

    let url = `/domain/loginas/${adminUsername}/${adminPwd}/${userDomainKey}?userEmail=${userEmail}`;

    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + url, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  
  //=========================================
  //Properties APIs
  //=========================================
  getDomainProperty(propertyName?:string): Observable<any> {
    
    let httpOptions = this.httpOptions;
    let url = `/domain/property/get/-/${propertyName}`;

    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + url, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  //=========================================
  //Screen APIs
  //=========================================
  upsertScreenAPI(body_data:ScreenModel): Observable<any> {

    let httpOptions = this.httpOptions;
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/screen/upsert/${this.atoken}`, body_data, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  searchScreenByQueryAPI(query_data:any, isVersion?:boolean): Observable<any> {
    let httpOptions = this.httpOptions;

    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/screen/search/query?versions=${isVersion}`, query_data, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  screenSearchByTemplateAPI(query_data:string, isVersion:boolean): Observable<any> {
    let httpOptions = this.httpOptions;

    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/screen/search/template?versions=${isVersion}`, query_data, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  importScreenAPI(screenId:string): Observable<any> {
    let httpOptions = this.httpOptions;

    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + `/screen/imports/-/${screenId}`, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  deleteScreenAPI(screenId:String): Observable<any> {
    let httpOptions = this.httpOptions;

    return this.http
      .delete<any>(this.PLATFORM_API_PATH+`/screen/delete/${this.atoken}/${screenId}`,httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  deleteImportedScreenAPI(screenId:String): Observable<any> {
    let httpOptions = this.httpOptions;

    return this.http
      .delete<any>(this.PLATFORM_API_PATH+`/screen/imported/delete/-/${screenId}`,httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }
  //=========================================
  //License APIs
  //=========================================
  getDomainLicenseAPI(domainKey?:string): Observable<any> {
    let httpOptions = this.httpOptions;

    let url = `/license/domain/get`;
    if(domainKey && domainKey !== ""){
      url = `/license/domain/get?domainKey=${domainKey}`;
    }

    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + url, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  getAllPlans(): Observable<any> {
    let httpOptions = this.httpOptions;

    let url = `/license/plans`;

    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + url, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  getClusterMonthlyUsagePlanAPI(accountId: String, planId: String): Observable<any> {
    let httpOptions = this.httpOptions;
    return this.http
      .get<ApiResponse[]>(this.PLATFORM_API_PATH + "/cluster/usage/plan/get/"+accountId+"/"+planId, httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public applyLicensePlanAPI(accountId:string, planId:string, body_data:any): Observable<any> {

    let httpOptions = this.httpOptions;
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/license/plan/apply/${accountId}/${planId}`, body_data, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public applyLicenseAddonAPI(domainKey:string, body_data:any): Observable<any> {

    let httpOptions = this.httpOptions;
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/license/addon/apply/${domainKey}`, body_data, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public createTenantAPI(isLink:boolean, tenantObj:any, customerToken:string): Observable<any> {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'TOKEN': customerToken
      })
    };

    let httpOptions = this.httpOptions;

    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/license/tenant/create/${isLink}`, tenantObj, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public changePasswordAPI(email:string, pswd:any): Observable<any> {

    let httpOptions = this.httpOptions;
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/user/changepass/-/${email}/${pswd}`, null, httpOptions)
      .pipe(map(data => data),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  //=========================================
  //Domain Login 
  //=========================================
  public loginAPI(req_data:any): Observable<any> {
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/domain/login`, req_data)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }
   //=========================================
  // Register API call 
  //=========================================
  public registerAPI(registerObj:any): Observable<any> {
    const header=new HttpHeaders({
      "Content-Type":"application/json"
          })
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/domain/register`,JSON.stringify(registerObj),{headers:header})
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }
//=========================================
  // Forgot Password  API call 
  //=========================================
  public forgotPasswordAPI(email:any): Observable<any> {
    const header=new HttpHeaders({
      "Content-Type":"application/json"
          })
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/license/password/forgot/`+email,{headers:header})
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }
  //=========================================
  // Profile Settings  API call 
  //=========================================
  public editProfile(profileObj:any): Observable<any> {
 let header=this.httpOptions
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/user/upsert/`+'-',JSON.stringify(profileObj),header)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

    //=========================================
  // upsertuserProperty  API call 
  //=========================================
  public getuserProperty(email:any,name:any): Observable<any> {
    let header=this.httpOptions
       return this.http
         .get<any>(this.PLATFORM_API_PATH + `/user/property/get/`+'-'+'/'+email+'/'+name,header)
         .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
     }

  public switchLoginAPI(token:String, domainKey:String): Observable<any> {
    return this.http
      .get<any>(this.PLATFORM_API_PATH + `/domain/login/switch/${token}/${domainKey}`)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public deleteDomainAPI(domainKey:String): Observable<any> {
    let httpOptions = this.httpOptions;
    return this.http
      .delete<any>(this.PLATFORM_API_PATH+`/domain/delete/-/${domainKey}?force=true`,httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  public elasticSearchQueryAPI(query_data:any): Observable<any> {

    let httpOptions = this.httpOptions;
    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/elastic/search/query/${this.atoken}`, query_data, httpOptions)
      .pipe(map(data => this.QueryFormatter(data)),retry(1), catchError(error => this.handleError(error, this.router)));
  }

  private QueryFormatter(data: any): any {

    var resultObj = {
        total: 0,
        data: {},
        aggregations: {}
    }

    if (data.httpCode === 200) {

        var arrayData = JSON.parse(data.result);

        var totalRecords = arrayData.hits.total ? arrayData.hits.total.value : 0;
        var records = arrayData.hits.hits;

        var aggregations = arrayData.aggregations ? arrayData.aggregations : {};

        var count = 0;

        var tempData = []

        for (var i = 0; i < records.length; i++) {
            if (records[i]['_id'] != '_search') {
                records[i]['_source']['_id'] = records[i]['_id'];
                tempData.push(records[i]['_source']);
            } else {
                count++;
            }
        }

        totalRecords = totalRecords > 0 ? totalRecords - count : 0
        resultObj = {
            "total": totalRecords,
            "data": {
                "recordsTotal": totalRecords,
                "recordsFiltered": totalRecords,
                "data": tempData
            },
            aggregations: aggregations
        }

        return resultObj;
    } else {
        return resultObj;
    }

  }

  //=========================================
  //Micro API 
  //=========================================
  public microAPI(slug:string, api:string, method:string, data:any, key:string, token:string, obj:any): Observable<any> {

    let headers:any = {};
    
    if(obj.authType == 'TOKEN'){
        headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'TOKEN': token
        });
    }else if(obj.authType == 'KEY'){
        headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'TOKEN': key
        });
    }

    return this.http
      .post<any>(this.PLATFORM_API_PATH + `/micro/service/call/${method}/${slug}/${api}`, data, {
        headers : headers
      }).pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  //=========================================
  //Error Handler
  //=========================================
  public handleError(error: HttpErrorResponse, router: Router) {

    if (error.status === 401) {
      localStorage.removeItem("userObj");
      router.navigate(['/login']);
  }
    
    let errorMessage = {
        "status" : false,
        "status_code" : error.status,
        "message" : error.error
      };

    return throwError(() => {
      return errorMessage;
    });
  }

  //=========================================
  //Upload File
  //=========================================
  uploadFile(body_data?:any): Observable<any> {
    return this.http
      .post<ApiResponse[]>(this.PLATFORM_API_PATH + "/files/upload/"+this.atoken, body_data)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

  setDomainProperty(body_data?:any): Observable<any> {
    
    let httpOptions = this.httpOptions;
    let url = `/domain/property/upsert/`+this.atoken;

    return this.http
      .post<ApiResponse[]>(this.PLATFORM_API_PATH + url,body_data,httpOptions)
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }

}