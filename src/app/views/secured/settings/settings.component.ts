import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { CommonDataService } from 'src/app/services/commondata.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  changePasswordForm: any = FormGroup
  changePasswordTab: boolean = true;
  Preferences: boolean = false
  public isLoading = false;
  public isPassword: boolean = false;
  public isPasswordTwo: boolean = false;
  submitted: boolean = false;
  token: string;
  domainUser: any
  newPassword: string;
  confPassword: string;
  notMatch: boolean = false


  constructor(private _commonDataService: CommonDataService, private _boodskapService: BoodskapService
  ) {
    this._commonDataService.user$.subscribe(value => {
      this.token = (value.token);

      this.domainUser = (value.user);
    });
  }
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('')
    })
  }
  submit() {
    this.submitted = true
    this.newPassword = this.changePasswordForm.controls.newPassword.value;
    this.confPassword = this.changePasswordForm.controls.confirmPassword.value
    if (this.changePasswordForm.status == "VALID" && this.newPassword == this.confPassword) {
      this.domainUser['password'] = this.changePasswordForm.controls.newPassword.value;
      this._boodskapService.editProfile(this.domainUser).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Success!',
            html: `Password updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });
        }, error: (err) => {
          Swal.fire({
            title: 'Failed!',
            html: `Password updated failed.`,
            icon: 'error',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });
        }
      })
    }
    else {
    }

  }
  PreferencesTab() {
    this.Preferences = true
    this.changePasswordTab = false
  }
  passwordTab() {
    this.changePasswordTab = true
    this.Preferences = false;

  }

}
