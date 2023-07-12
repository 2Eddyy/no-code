import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonDataService } from 'src/app/services/commondata.service';
import { ProjectController } from '../project.controller';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  @Output() emitevent = new EventEmitter();
  @Input() listprojects: any;
  // listprojects: any
  getdata(data: any) {
    // console.log('transfered data', data);
    // project_name: new FormControl('', Validators.required),
    // app_id: new FormControl('', Validators.required),
    // project_tag: new FormControl('', Validators.required),
    // project_category: new FormControl('', Validators.required),
    // project_desc: new FormControl(''),
    // project_icon: new FormControl(''),
    this.formValues.controls.project_name.setValue(data.project_name);
    this.formValues.controls.app_id.setValue(data.app_id);
    this.formValues.controls.project_tag.setValue(data.project_tag);
    this.formValues.controls.project_category.setValue(data.project_category);
    this.formValues.controls.project_desc.setValue(data.project_desc);
    this.uploadedFile = data.project_icon;
    this.imageUploadText = data.icon_name;
    // this.formValues.controls.project_icon.setValue()
  }

  token: string = '';
  submitted = false;
  formValues: any;
  formImage: any;
  imageUploadText: string = '';
  step1: boolean = false;
  step2: boolean = true;
  projectList: any = [];
  user_subject: any;
  userObj: any;
  selectedFile: any;
  uploadedFile: any = '';
  uploadFileStatus: boolean = false;
  api_token = '';
  constructor(
    private router: Router,
    private projectController: ProjectController,
    private commonDataService: CommonDataService,
    private boodskapService: BoodskapService,
    private http: HttpClient
  ) {
    this.formValues = new FormGroup(
      {
        project_name: new FormControl('', Validators.required),
        app_id: new FormControl('', Validators.required),
        project_tag: new FormControl('', Validators.required),
        project_category: new FormControl('', Validators.required),
        project_desc: new FormControl(''),
        project_icon: new FormControl(''),
      },
      { updateOn: 'blur' }
    );
    this.formImage = new FormGroup({
      imageUploaded: new FormControl(),
    });
    this.api_token = JSON.parse(localStorage.getItem('userObj') || '{}').token;
  }
  selectedTag: number;
  selectedCategory: number;
  tagsList = [
    { id: 1, name: 'IoT' },
    { id: 2, name: 'Service' },
    { id: 3, name: 'Product' },
    { id: 4, name: 'POC' },
  ];
  categoryList = [
    { id: 1, name: 'IoT Project' },
    { id: 2, name: 'Service' },
    { id: 3, name: 'Product' },
    { id: 4, name: 'POC' },
  ];
  templateList = [
    {
      name: 'Admin Dashboard',
      img: 'project1.jpg',
    },
    {
      name: 'Healthcare',
      img: 'project2.jpg',
    },
    {
      name: 'Banking',
      img: 'project2.jpg',
    },
    {
      name: 'Agriculture',
      img: 'project2.jpg',
    },
    {
      name: 'Industrial Machinery',
      img: 'project2.jpg',
    },
    {
      name: 'Retail Trade',
      img: 'project2.jpg',
    },
  ];

  // getProjectsList() {
  //   this.projectController.getProjectsList((status: any, result: any) => {
  //     console.log("result",JSON.parse(result.value))
  //     if (status) {
  //       this.projectList = result.value ? JSON.parse(result.value) : [];
  //     } else {
  //       this.projectList = [];
  //     }
  //   });
  // }

  get f(): { [key: string]: AbstractControl } {
    return this.formValues.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    return this.formImage.controls;
  }
  image(a: any) {
    return a.substring(0, 12) + '.' + a.split('.').slice(-1)[0];
  }
  CreateProject() {
    this.submitted = true;
    if (this.formValues.status == 'INVALID') {
      this.finish = false;
      return;
    } else {
      let project = this.formValues.value;
      project['created_ts'] = new Date().getTime();
      project['updated_ts'] = new Date().getTime();
      project['project_icon'] = this.uploadedFile;
      project['project_tag'] = this.selectedTag;
      project['project_category'] = this.selectedCategory;
      project['isDeleted'] = false;
      if (this.formImage.controls.imageUploaded.value) {
        project['icon_name'] = this.selectedFile.name;
      }
      // console.log("project",project);

      this.listprojects.push(project);
      // console.log("project",this.listprojects);
      let requestObj = {
        name: 'project.details',
        value: JSON.stringify(this.listprojects),
      };
      this.boodskapService.setDomainProperty(requestObj).subscribe({
        next: (res) => {
          if (res.code == 'SUCCESS') {
            this.step1 = true;
          }
        },
        error: (err) => {
          this.finish = false;
        },
        complete: () => {},
      });
    }
  }
  filesize: boolean = false;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files[0].size > 1000000) {
      this.filesize = true;
      setTimeout(() => {
        this.filesize = false;
      }, 2000);
      event.preventDefault();
      this.imageload = false;
    } else {
      this.imageload = true;
      this.uploadFile();
    }
  }
  imageload: boolean = false;
  uploadFile() {
    this.uploadFileStatus = false;
    this.imageUploadText = this.selectedFile.name;
    let type = this.selectedFile.type;
    let formData = new FormData();
    formData.append('binfile', this.selectedFile, this.selectedFile.name);
    formData.append('mediaType', this.selectedFile.type);
    formData.append('description', '');
    if (
      type.indexOf('jpeg') > 0 ||
      type.indexOf('JPEG') > 0 ||
      type.indexOf('jpg') > 0 ||
      type.indexOf('JPG') > 0 ||
      type.indexOf('png') > 0 ||
      type.indexOf('PNG') > 0 ||
      type.indexOf('svg') > 0 ||
      type.indexOf('gif') > 0 ||
      type.indexOf('tif') > 0 ||
      type.indexOf('tiff') > 0
    ) {
      this.projectController.uploadFileFn(
        formData,
        (status: boolean, result: any) => {
          if (status) {
            this.imageload = false;
            this.uploadedFile = result.id;
          } else {
            this.imageload = false;
            this.uploadFileStatus = false;
          }
        }
      );
    } else {
      this.imageload = false;
      this.uploadFileStatus = true;
    }
  }
  namingproject: boolean = false;
  namingappid: boolean = false;
  noduplicate() {
    if (
      this.listprojects.filter(
        (e: any) =>
          e.project_name === this.formValues.controls.project_name.value
      ).length > 0
    ) {
      this.namingproject = true;
      this.formValues.controls['project_name'].setErrors({ incorrect: true });
    }
  }
  appidduplicate() {
    if (
      this.listprojects.filter(
        (e: any) => e.app_id === this.formValues.controls.app_id.value
      ).length > 0
    ) {
      this.namingappid = true;
      this.formValues.controls['app_id'].setErrors({ incorrect: true });
    }
  }
  goBackproject() {
    this.submitted = false;
    this.uploadFileStatus = false;
    this.formValues.reset();
    // this.formImage.reset();
    this.uploadedFile = '';
    this.emitevent.emit();
    this.step1 = false;
    this.step2 = true;
  }
  finish: boolean = false;
  gotodashboard() {
    this.finish = true;
    this.CreateProject();
    const queryParams = {
      appId: this.formValues.controls.app_id.value,
      projectName: this.formValues.controls.project_name.value,
    };

    this.router.navigate(['/builder/' + queryParams.appId], { queryParams });
  }

  trigUploadClick() {
    let element: HTMLElement = document.getElementById(
      'iconUpload'
    ) as HTMLElement;
    element.click();
  }

  ngOnInit() {
    this.user_subject = this.commonDataService.user$.subscribe((value) => {
      this.userObj = value;
    });

    // this.getProjectsList();
  }
}
