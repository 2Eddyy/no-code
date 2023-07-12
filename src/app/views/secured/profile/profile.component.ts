import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { CommonDataService } from 'src/app/services/commondata.service';
import Swal from 'sweetalert2';
import { SecuredHeader } from '../../layouts/secured.layout/header/secured-header.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  PLATFORM_API_PATH: string = 'https://v5dev.boodskap.io/api'
  PROFILE_PIC_ID: string = '4a02a73c-85ba-11e8-adc0-fa7ae01bbebc';
  PROFILE_PICTURE_PROPERTY: string = "user.picture";
  userFirstName: string;
  userLastName: string;
  userEmailId: any;
  userProfile: any = FormGroup;
  submitted: boolean = false;
  isdesabled: Boolean = true;
  fileToUpload: any
  imageUrl: any
  profileObj: any
  domainUser: any
  picture: any
  PROFILE_IMG_ID: any
  token: string
  picId: any;
  profileImageSrc: any
  piciD:any;
  changePicture:any

  constructor(private _commonDataService: CommonDataService, private _boodskapService: BoodskapService, private http: HttpClient
  ) {
    this._commonDataService.user$.subscribe(value => {
      this.token = (value.token);

      this.domainUser = (value.user);
      this.userFirstName = value.user.firstName;
      this.userLastName = value.user.lastName;
      this.userEmailId = value.user.email
    });
  }

  ngOnInit(): void {

    this.userProfile = new FormGroup({
      firstName: new FormControl(this.userFirstName),
      lastName: new FormControl(this.userLastName),
      phone: new FormControl("")
    })
  
    this._boodskapService.getuserProperty(this.userEmailId, this.PROFILE_PICTURE_PROPERTY).subscribe({
      next: (res: any) => {
        let id = (JSON.parse(res.value));
         this.piciD = (id.picture);
        this.profileImageSrc = this.PLATFORM_API_PATH + '/files/download/' + this.token + '/' + this.piciD + '?' + new Date().getTime();
      
      }, error: (err) => {
       
      }
    })

  }
  submit() {
    this.domainUser.firstName = this.userProfile.controls.firstName.value;
    this.domainUser.lastName = this.userProfile.controls.lastName.value
    this.domainUser.primaryPhone = this.userProfile.controls.phone.value
    this.submitted = true
    if (this.userProfile.controls.firstName.value && this.userProfile.controls.lastName.value) {
      this._boodskapService.editProfile(this.domainUser).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Success!',
            html: `Profile updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });
        }, error: ((err: any) => {
          Swal.fire({
            title: 'Failed!',
            html: `Profile updated failed.`,
            icon: 'error',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });

        })
      })
    }



  }
  Filedata(files: any) {


    this.fileToUpload = files.target.files[0];


    this.uploadProfileImg(this.fileToUpload)


  }
  uploadProfileImg(event: any) {
    let token = this.token
    let userEmail = this.userEmailId
    let HTTP = this.http
    if (event.size < 1000000) {
      const logo_name = event.name
      this.PROFILE_IMG_ID = logo_name.split('.')
      this.PROFILE_IMG_ID = this.PROFILE_IMG_ID[0]
      const xhr = new XMLHttpRequest();
      const self = this;
      let pic1

      xhr.onreadystatechange = function () {
         header:SecuredHeader
        let PROFILE_PICTURE_PROPERTY = "user.picture";
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const resObj = JSON.parse(xhr.response);
            pic1 = resObj.id
            const profileImage = 'https://v5dev.boodskap.io/api' + '/files/download/' + token + '/' + resObj.id + '?' + new Date().getTime();
           let changePic = document.getElementById('Picture')
           changePic?.setAttribute('src',profileImage)

            var obj = {
              picture: resObj.id
            };
            const data = {
              name: PROFILE_PICTURE_PROPERTY,
              userId: userEmail,
              value: JSON.stringify(obj)
            };
            self.uploadImage(data).subscribe({
              next: (res: any) => {

                Swal.fire({
                  title: 'Success!',
                  html: `Profile Image updated successfully.`,
                  icon: 'success',
                  confirmButtonColor: '#f41a7b',
                  confirmButtonText: 'Ok, Close'
                });
              }, error: (err: any) => {
                Swal.fire({
                  title: 'Failed!',
                  html: `Profile Image updated failed.`,
                  icon: 'error',
                  confirmButtonColor: '#f41a7b',
                  confirmButtonText: 'Ok, Close'
                });

              }
            })

          } else {
          }
        }
      };
      xhr.open('POST', 'https://v5dev.boodskap.io/api' + '/files/upload/' + this.token + '?id=' + this.PROFILE_PIC_ID, true);
      let formData = new FormData();
      formData.append('binfile', event, event.name);
      formData.append('mediaType', event.type);
      formData.append('tags', "user");
      xhr.send(formData);
    } else {
    }



  }

  uploadImage(data: any) {
    const header: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'TOKEN': this.token
    })
    return this.http.post(this.PLATFORM_API_PATH + `/user/property/upsert/-`, JSON.stringify(data), { headers: header })
  }



}
