import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonDataService } from 'src/app/services/commondata.service';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';

@Component({
  selector: 'app-secured.layout',
  templateUrl: './secured.layout.component.html',
  styleUrls: ['./secured.layout.component.scss']
})
export class SecuredLayoutComponent implements OnInit {

  public visible:boolean = false;
  public _subs_user_data:any;
  public _subs_admin_data:any;
  public _subs_domain_admin_data:any;
  public _subs_account_admin_data:any;
  public userObj:any;
  public adminAccess:any = false;
  public domainAdminAccess:any = false;
  public accountAdminAccess:any = false;
  public menuVisible = false;

  @ViewChild(LeftmenuComponent) leftMenu!: LeftmenuComponent;
  @ViewChild(SecuredLayoutComponent) progressBar: SecuredLayoutComponent;

  constructor(
      public _commonDataService: CommonDataService
    ) {}

  onToggleMenu(event: boolean) {
    this.visible = event;
  }

  toggleMenu(){
    try{
      this.visible = this.leftMenu.toggle();
    }catch(e){
      console.log(e);
    }
  }

  ngOnDestroy() {
    this._subs_user_data.unsubscribe();
    this._subs_admin_data.unsubscribe();
    this._subs_domain_admin_data.unsubscribe();
    this._subs_account_admin_data.unsubscribe();
  }

  ngOnInit(): void {
    
    this._subs_user_data = this._commonDataService.user$.subscribe(value => {
      this.userObj= value;
    });

    this._subs_admin_data = this._commonDataService.adminAccess$.subscribe(value => {
      if(value === "true" || value === true){
        this.adminAccess = true;
      }else{
        this.adminAccess = false;
      }
    });

    this._subs_domain_admin_data = this._commonDataService.domainAdminAccess$.subscribe(value => {
      if(value === "true" || value === true){
        this.domainAdminAccess = true;
      }else{
        this.domainAdminAccess = false;
      }
    });

    this._subs_account_admin_data = this._commonDataService.accountAdminAccess$.subscribe(value => {
      if(value === "true" || value === true){
        this.accountAdminAccess = true;
      }else{
        this.accountAdminAccess = false;
      }
    });
  }
}