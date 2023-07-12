import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { CommonDataService } from 'src/app/services/commondata.service';



@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domains_list: any;
  partDomainsList: any
  atoken: string;
  searchBox: any = '';
  value:any

  constructor(
    protected router: Router, private _boodskapService: BoodskapService, private _commonDataService: CommonDataService
  ) {
    this._commonDataService.user$.subscribe(value => {
      this.value=value
      this.atoken = value.token;
      this.partDomainsList = (value.partDomains);
      console.log(this.partDomainsList);
    });
  }

  logout() {
    localStorage.removeItem("sessionObj");
    localStorage.removeItem("userObj");
    this.router.navigate(["/login"]);
  }
  ngOnInit(): void {
    if (localStorage.getItem("userObj") != null) { 
      this.router.navigate(["/domains"]);
      let domainObj = JSON.parse(localStorage.getItem("userObj") as any);
      this.domains_list = domainObj.partDomains;
      console.log(this.domains_list);
    };
  }
  selectDomain(dKey: string) {
    this._boodskapService.switchLoginAPI(this.atoken, dKey).subscribe({
      next: (res: any) => {
        console.log(res);
        this._commonDataService.setUserData(res);
        if (res != null) {
     this.router.navigate(["/projects"]);
     this._commonDataService.setAdminAccess(true);
    
        }
       

      },error:(err:any)=>{
        // this.router.navigate(["/login"]);

      }
    })
  }

}
