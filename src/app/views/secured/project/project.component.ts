import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProjectController } from './project.controller';
import { CreateProjectComponent } from './create-project/create-project.component';
import Swal from 'sweetalert2';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  start: any = 0;
  end: any = 10;

  pageno: any = this.end / 10;
  @ViewChild(CreateProjectComponent) child: CreateProjectComponent;
  @Output() emitvalue = new EventEmitter();
  projectList: any = [];
  searchProject: any = '';
  categoryList = [
    { id: 1, name: 'IoT Project' },
    { id: 2, name: 'Service' },
    { id: 3, name: 'Product' },
    { id: 4, name: 'POC' },
  ];
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.visible = false;
    this.child.goBackproject();
  }
  api_token = '';

  constructor(
    private projectController: ProjectController,
    private boodskapService: BoodskapService,
    private router: Router
  ) {
    this.api_token = JSON.parse(localStorage.getItem('userObj') || '{}').token;
  }
  size: number = 0;
  current: any = 'published';
  statuscheck: boolean = false;
  totalProjectList: any = [];
  // drafted:boolean=false
  // archived:boolean=false
  totalsize: any;
  getProjectDetails() { 
    this.projectController.getProjectsList((status: boolean, result: any) => {
      this.totalProjectList = JSON.parse(result.value);
      // console.log('total list', JSON.parse(result.value));

      if (status) {
        JSON.parse(result.value).forEach((item: any) => {
          if (item.isDeleted === false || !item.hasOwnProperty('isDeleted')) {
            this.projectList.push(item);
          }
        });
        let sorted = this.projectList.sort((a: any, b: any) =>
          a.updated_ts < b.updated_ts ? 1 : a.updated_ts > b.updated_ts ? -1 : 0
        );
        this.projectList = sorted;
        this.statuscheck = true;
        this.totalsize = sorted.length;
        this.size = this.projectList.length;
        this.published = this.projectList;
      } else {
        this.projectList = [];
        this.statuscheck = true;
      }
    });
  }
  Clone(project: any) {
    this.child.getdata(project);
    this.togglecard();
  }

  previous(a: any, b: any) {
    this.end = a;
    this.start = a - 10;
    this.pageno = this.end / 10;
  }

  next(a: any, b: any) {
    if (this.size > 10 && b <= 10) {
      this.start = 10;
      this.end = 20;
    }
    this.pageno = this.end / 10;
  }
  deleteProject(project: any) {
    let index = this.totalProjectList.findIndex(
      (item: any) => item.project_name === project.project_name
    );

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete ' + project.project_name + ' project?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('Before Inside delete', this.totalProjectList);
        this.totalProjectList.splice(index, 1);
        this.statuscheck = false;
        project['updated_ts'] = new Date().getTime();
        project['isDeleted'] = true;

        this.totalProjectList.push(project);
        // this.totalProjectList=[]

        let requestObj = {
          name: 'project.details',
          value: JSON.stringify(this.totalProjectList),
        };
        this.boodskapService.setDomainProperty(requestObj).subscribe({
          next: (res) => {
            if (res.code == 'SUCCESS') {
              Swal.fire({
                title:'Deleted!',
                text: 'Your Project has been deleted.',
                icon:'success',
                confirmButtonColor: '#673ab7',
              }
              
              );
              this.projectList = [];
              this.start = 0;
              this.end = 10;
              this.pageno = this.end / 10;
              this.getProjectDetails();
            }
          },
          error: (err) => {},
          complete: () => {},
        });
      }
    });
  }
  archived: any;
  published: any;
  currentTab(value: any) {
    this.projectList = [];
    this.current = value;
    if (value === 'archived') {
      // console.log('total', this.totalProjectList);
      this.start = 0;
      this.end = 10;
      this.pageno = this.end / 10;
      this.archived = this.totalProjectList.filter((item: any) => {
        if (item.isDeleted === true) {
          return item.isDeleted;
        }
      });
      this.projectList = this.archived;
      this.totalsize = this.archived.length;
      this.size = this.archived.length;
      // console.log('archived', archived);
    } else if (value === 'published') {
      this.start = 0;
      this.end = 10;
      this.pageno = this.end / 10;
      this.totalProjectList.forEach((item: any) => {
        if (item.isDeleted === false || !item.hasOwnProperty('isDeleted')) {
          this.projectList.push(item);
        }
      });
      this.published = this.projectList.sort((a: any, b: any) =>
        a.updated_ts < b.updated_ts ? 1 : a.updated_ts > b.updated_ts ? -1 : 0
      );
      this.projectList = this.published;
      this.size = this.published.length;
      this.totalsize = this.published.length;
    }
  }

  ngOnInit() {
    this.getProjectDetails();
  }

  transform() {
    console.log('value', this.searchProject);
    console.log('length', this.published.length);

    this.projectController.getMyData().subscribe((counter: any) => {
      this.size = counter;
      if (this.searchProject == '' && this.current == 'published') {
        // console.log('here inside');

        this.size = this.published.length;
      }
      if (this.searchProject == '' && this.current == 'archived') {
        console.log('here inside');

        this.size = this.archived.length;
      }
      // console.log('size', this.size);
    });
  }
  sorting: boolean = false;
  sortname(a: any, b: any) {
    if (this.sorting == false) {
      this.sorting = true;
    } else {
      this.sorting = false;
    }
    if (this.sorting == true) {
      const compare = (a: any, b: any) =>
        a.project_name
          .toUpperCase()
          .localeCompare(b.project_name.toUpperCase());
      const sortfrom = a;
      const sorter = this.projectList.splice(sortfrom);
      sorter.sort(compare);
      this.projectList.splice(sortfrom, 0, ...sorter);
      console.log('sorted', this.projectList);
      // const sortedList = this.projectList
      //   .slice(a, b)
      //   .sort((a: any, b: any) => a.project_name.localeCompare(b.project_name));
      // this.projectList = sortedList;
    } else {
      const compare = (a: any, b: any) =>
        b.project_name
          .toUpperCase()
          .localeCompare(a.project_name.toUpperCase());
      const sortfrom = a;
      const sorter = this.projectList.splice(sortfrom);
      sorter.sort(compare);
      this.projectList.splice(sortfrom, 0, ...sorter);
      console.log('sorted', this.projectList);
      // const sortedList = this.projectList
      //   .slice(a, b)
      //   .sort((a: any, b: any) => b.project_name.localeCompare(a.project_name));
      // this.projectList = sortedList;
    }
  }

  sortingtime: boolean = false;
  sorttime(a: any, b: any) {
    if (this.sortingtime == false) {
      this.sortingtime = true;
    } else {
      this.sortingtime = false;
    }
    if (this.sortingtime == true) {
      const compare = (a: any, b: any) => a.updated_ts - b.updated_ts;
      const sortfrom = a;
      const sorter = this.projectList.splice(sortfrom);
      sorter.sort(compare);
      this.projectList.splice(sortfrom, 0, ...sorter);
      console.log('sorted', this.projectList);
      // const sortedList = this.projectList
      //   .slice(a, b)
      //   .sort((a: any, b: any) => a.project_name.localeCompare(b.project_name));
      // this.projectList = sortedList;
    } else {
      const compare = (a: any, b: any) => b.updated_ts - a.updated_ts;
      const sortfrom = a;
      const sorter = this.projectList.splice(sortfrom);
      sorter.sort(compare);
      this.projectList.splice(sortfrom, 0, ...sorter);
      console.log('sorted', this.projectList);
      // const sortedList = this.projectList
      //   .slice(a, b)
      //   .sort((a: any, b: any) => b.project_name.localeCompare(a.project_name));
      // this.projectList = sortedList;
    }
  }
  list: boolean = false;
  listview() {
    this.list = true;
  }
  changevisibility() {
    this.visible = false;
  }
  visible: boolean = false;
  togglecard() {
    this.visible = true;
  }

  navigateWithParams(params: any) {
    const queryParams = {
      appId: params.app_id,
      projectName: params.project_name,
    };

    this.router.navigate(['/builder/' + queryParams.appId], { queryParams });
  }
}
