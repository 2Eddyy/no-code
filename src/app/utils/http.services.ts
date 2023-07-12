import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonDataService } from '../services/commondata.service';

class HttpRes {
  constructor(public status: Boolean, public result: any) {}
}

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  private API_BASE_PATH = environment.api_base_path;
  private atoken:string = "";
  private httpOptions:any;

  constructor(
    private http: HttpClient, 
    private _commonDataService: CommonDataService,
    private router: Router
    ) {

    this._commonDataService.user$.subscribe(value => {
      
      this.atoken = value.token;

      this.httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.atoken ? this.atoken : ""
      });
    });

    this._commonDataService.config$.subscribe(value => {
      this.API_BASE_PATH = environment.api_base_path;
    });
  }

  //=========================================
  //Get Request
  //=========================================
  getCall(url: String, data:any): Observable<any> {

    let params:any;
    
    if(data){
       params = new HttpParams()
       params = params.set('payload', JSON.stringify(data));
    }

    return this.http
      .get<HttpRes[]>(this.API_BASE_PATH + url, 
        {
          params: params, 
          headers: this.httpOptions,
          withCredentials: this.atoken ? true : false
        }
      )
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }


  //=========================================
  //Post Request
  //=========================================
  postCall(url: String, req_data:any): Observable<any> {

    return this.http
      .post<any>(this.API_BASE_PATH + url, req_data, {
        headers: this.httpOptions,
        withCredentials: this.atoken ? true : false
      })
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }


  //=========================================
  //Put Request
  //=========================================
  putCall(url: String, req_data:any): Observable<any> {
    return this.http
      .put<any>(this.API_BASE_PATH + url, req_data, 
        {
          headers: this.httpOptions,
          withCredentials: this.atoken ? true : false
      })
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
  }


  //=========================================
  //Delete Request
  //=========================================
  deleteCall(url: String): Observable<any> {
    return this.http
      .delete<any>(this.API_BASE_PATH + url, 
        { 
          headers : this.httpOptions,
          withCredentials: this.atoken ? true : false
        }
      )
      .pipe(retry(1), catchError(error => this.handleError(error, this.router)));
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
}