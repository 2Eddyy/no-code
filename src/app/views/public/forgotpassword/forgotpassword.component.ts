import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { BoodskapService } from 'src/app/services/boodskap.services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/commondata.service';




@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{

  forgotEmail:any=FormGroup;
  public useremail:any;
  isLoading:boolean=false;
  submitted:any=false;
  isLogin:boolean=true;
  test:boolean=true;
  forgotErr:any;
  webVersion:string=""
  constructor(protected boodskapService: BoodskapService, private router:Router,private _commonDataService: CommonDataService){}
  
  checkInput(){

    if(this.forgotEmail.controls.emailForgot.errors.required !=true){
      this.submitted=false  
    }
    }
  submit(){ 
    this.submitted=true
    this.useremail=this.forgotEmail.value.emailForgot
    let emailStatus:any=(this.forgotEmail.status);
    if(emailStatus=="VALID"){
      this.isLoading=true;
      this.isLogin=false;
      this.boodskapService.forgotPasswordAPI(this.useremail).subscribe({next:(res:any)=>{
        if(res.code=="SUCCESS"){
          this.isLoading=false;
          this.isLogin=true;
          this.router.navigate(['/forgot-success'])
        }
      },error:(err:any)=>{
        this.isLoading=false;
        this.isLogin=true;
        this.forgotErr="User not found !"
        setTimeout(() => {
          this.forgotErr=""
        },2000);
      
      }
      
      }) 
    }
  }
  ngOnInit(): void {
    this.forgotEmail=  new FormGroup({
        emailForgot:new FormControl('',[Validators.email])
      }) 
  
      this._commonDataService.config$.subscribe((config: any) => {
  
        
        
        this.webVersion =config.version
        
      });
    }
}
