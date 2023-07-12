import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoodskapService } from 'src/app/services/boodskap.services';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/services/commondata.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor( protected boodskapService: BoodskapService, private router: Router,private _commonDataService: CommonDataService) { }
  registerForm: any = FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  islogin: boolean = true;
  public RegisterObj: any;
  webVersion:string=""
  regErr: any;
  

  
checkInput(){

if(this.registerForm.controls.email.errors.required !=true){
  this.submitted=false  
}
}
  submit() {
    this.submitted = true;
    this.RegisterObj = {
      "firstName": this.registerForm.value.firstName,
      "lastName": this.registerForm.value.lastName,
      "email": this.registerForm.value.email,
    }
    let registerStatus: any = (this.registerForm.status);
    if (registerStatus == "VALID") {

      this.islogin = false
      this.isLoading = true
      this.boodskapService.registerAPI(this.RegisterObj).subscribe({
        next: (res: any) => {
          let response: any = res
          this.isLoading = false;
          this.islogin = true;
          if (response.errorCode == 409) {
            this.regErr = "User already exists !"
            setTimeout(() => {
              this.regErr =""
       },2000);
          }
          else {
            this.router.navigate(['/register-success'])
          }
        },
        error: (err: any) => {
          this.isLoading = false
          this.islogin = true
          if (err) {
            this.regErr = " Something went wrong, try again later!"

          }



        }
      })

    }

  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl()

    })

    this._commonDataService.config$.subscribe((config: any) => {

      
      this.webVersion =  config.version 
      console.log(config.version["Dev"],"config");
      
    });
  }
}
