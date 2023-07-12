
import { DomainModel } from 'src/app/models/DomainModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { HttpService } from 'src/app/utils/http.services';
import { CommonDataService } from 'src/app/services/commondata.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  public submitted = false;
  loginErr: any
  public isLoading = false;
  public isPassword: boolean = false;

  public webVersion: string = "";
  public isLogin: boolean = true;
  constructor(
    protected router: Router,
    protected boodskapService: BoodskapService,
    protected httpService: HttpService,
    private _commonDataService: CommonDataService,
  ) {
  }

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public submit() {

    this.submitted = true;

    if (this.loginForm.controls['email'].errors) {
      return;
    } else if (this.loginForm.controls['password'].errors) {
      return;
    } else {

      this.isLoading = true;
      this.isLogin = false;
      this.loginErr = "";

      this.boodskapService.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {

          this.submitted = false;
          this.isLoading = false;

          if (res) {
            
            if (res.partDomains.length > 0) {
              this.submitted = false;
              this.isLoading = false;
              this.isLogin = true;
              let userObj = res;

              this._commonDataService.setUserData(userObj);
              if (userObj.partDomains.length === 1) {
                if (userObj) {
                  let USER_ROLE: any = userObj.user ? userObj.user.roles : [];
                  this._commonDataService.setAdminAccess(false);
                  this._commonDataService.setDomainAdminAccess(false);
                  this._commonDataService.setAccountAdminAccess(false);

                  for (var i = 0; i < USER_ROLE.length; i++) {
                    if ('admin' === USER_ROLE[i]) {
                      this._commonDataService.setAdminAccess(true);
                      this.router.navigate(["/projects"]);
                    }
                    if ('user' === USER_ROLE[i]) {
                      this._commonDataService.setAdminAccess(true);
                      this.router.navigate(["/projects"]);
                    }
                    if ('developer' === USER_ROLE[i]) {
                      this._commonDataService.setAdminAccess(true);
                      this.router.navigate(["/projects"]);
                    }

                    if ('domainadmin' === USER_ROLE[i]) {
                      this._commonDataService.setDomainAdminAccess(true);
                      this.router.navigate(["/projects"]);

                    }

                    if ('accountadmin' === USER_ROLE[i]) {
                      this._commonDataService.setAccountAdminAccess(true);
                      this.router.navigate(["/projects"]);
                    }
                  }
                  
                }
              } else if (userObj.partDomains.length > 1) {
                this.router.navigate(["/domains"]); //TODO : Domain Admin Access

              } else {
                this.loginErr = "Domain not found!";
                setTimeout(() => {
                  this.loginErr=""
                },2000);
              }
            } else {
              this.loginErr = "Domain not found!";
              setTimeout(() => {
                this.loginErr=""
              },2000);
            }
          } else {
            this.loginErr = "Something went wrong, try again later !";
            setTimeout(() => {
              this.loginErr=""
            },2000);
          }
        },
        error: (err) => {
          this.submitted = false;
          this.isLoading = false;
          if (err.status_code === 401) {
          this.isLogin=true;
            this.loginErr = "Invalid username/password !";
            setTimeout(() => {
              this.loginErr=""
            },2000);
          } else {
            this.loginErr = "Something went wrong, try again later !";
    setTimeout(() => {
      this.loginErr=""
    },2000);
            this.isLogin=true;
          }
        },
        complete: () => {
          this.submitted = false;
          this.isLoading = false;
        }
      });
    }
  }
  public custPortalAuthCheck(userObj: any) {
    this.httpService.postCall('/v1/start-session', userObj).subscribe({
    });
  }
 

  public pageNavigator(url: String) {
    this.router.navigate(['/' + url]);
  }
  ngOnInit(): void {

   

    this._commonDataService.config$.subscribe((config: any) => {

      this.webVersion = config.version
      
    });
  }
}