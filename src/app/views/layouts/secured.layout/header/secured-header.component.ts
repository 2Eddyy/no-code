import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/commondata.service';
import { BoodskapService } from 'src/app/services/boodskap.services';


@Component({
  selector: 'secured-header',
  templateUrl: './secured-header.component.html',
  styleUrls: ['./secured-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SecuredHeader implements OnInit {
  @Input() menuStatus: boolean = false;
  @Output() menuToggled = new EventEmitter<boolean>();
  public _subs_user_data: any;
  public userObj: any;
  PLATFORM_API_PATH: string = 'https://v5dev.boodskap.io/api'
  PROFILE_PIC_ID: string = '4a02a73c-85ba-11e8-adc0-fa7ae01bbebc';
  PROFILE_PICTURE_PROPERTY: string = "user.picture";
  profileImageSrc:any
piciD:any
token:string

  constructor(private _boodskapService: BoodskapService,
    public _commonDataService: CommonDataService,
    public router: Router
  ) {}

  public toggleMenu() {
    this.menuStatus = !this.menuStatus;
    this.menuToggled.emit(this.menuStatus);
  }

  logoutAll() {
    this._commonDataService.removeAllSubject();
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true, // do not update browser URL
    };
    // navigate to login page without updating the browser URL
    this.router.navigate(['/login'], navigationExtras);
  }

  ngOnDestroy() {
    this._subs_user_data.unsubscribe();
  }
firstname:string=''
lastname:string=''
mail:string=''
  ngOnInit() {

    
    this._subs_user_data = this._commonDataService.user$.subscribe((value) => {
      this.userObj = value;
      this.token=value.token
    });
    console.log('userobj', this.userObj);
    this.firstname=this.userObj.user.firstName
    this.mail=this.userObj.user.email
    this.lastname=this.userObj.user.lastName
this.updateProfile()


  }

  updateProfile(){
    this._boodskapService.getuserProperty(this.mail, this.PROFILE_PICTURE_PROPERTY).subscribe({
      next: (res: any) => {
        let id = (JSON.parse(res.value));
         this.piciD = (id.picture);
        this.profileImageSrc = this.PLATFORM_API_PATH + '/files/download/' + this.token + '/' + this.piciD + '?' + new Date().getTime();
      
      }, error: (err) => {
       
      }
    })
  }
}
