import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EditorService } from "../editor.service";
import { Subject } from "rxjs";
import { EditorComponent } from "../editor.component";
import { LoginComponent } from "src/app/views/public/login/login.component";
import Swal from 'sweetalert2';
import { BoodskapService } from "src/app/services/boodskap.services";



@Component({
  selector: "app-create-screen",
  templateUrl: "./screens-list.component.html",
  styleUrls: ['./screens-list.component.scss']
})
export class ScreensListModel implements OnInit {

  setvalue: any
  closeModel: any;
  changeToHTML: any;
  selectScreen: any;
  srcDocContent: any = ''
  contentArea: any;
  listScreen: boolean = false;
  cardScreen: boolean = true;
  searchInput: any = '';
  screenCount: any
  constructor(public activeModal: NgbActiveModal, private editorSrv: EditorService,
    private editorComponent: EditorComponent, private _boodskapService: BoodskapService
  ) {

  }
  ngOnInit(): void {


    this.setvalue = this.editorSrv.ScreenList;


    setTimeout(() => {
      this.getScreenList()
    }, 100);


    this.editorSrv.ScreenListSubject.subscribe(res => {
      this.selectScreen = res
      this.screenCount = this.selectScreen.length

    console.log(this.selectScreen);

    })

    
  }

  getScreenList() {
    this.editorSrv.ScreenListSubject.next(this.setvalue)

  }
  changeListScreen() {
    this.cardScreen = false
    this.listScreen = true;

  }
  changeCardScreen() {
    this.listScreen = false;
    this.cardScreen = true
  }

  openScreenView(screen: any, modalClose: any) {
    modalClose.dismiss()
    this.editorSrv.setScreenData.next(screen)
  }
  openModal(activeModal: any) {
    activeModal.dismiss()
    this.editorComponent.openModal('create')
  }
  deleteScreen(screenName: any, screenId: any) {
    Swal.fire({
      title: 'Are you sure?',
      html: `Screen  <code><i class="fas fa-file-alt"></i> ${screenName ? screenName : screenId ? screenId : "N/A"}</code> <br> will the permanently deleted from the system.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#666666',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._boodskapService.deleteScreenAPI(screenId).subscribe({
          next: (response) => {
            if (response.code === "SUCCESS") {
              Swal.fire({
                title: 'Deleted!',
                html: `Selected screen has been deleted.`,
                icon: 'success',
                confirmButtonColor: '#673ab7',
                confirmButtonText: 'Ok, Close'
              });
              setTimeout(() => {

                this.editorComponent.screensList = []

                this.editorComponent.getScreensList()
              }, 1000);
            } else {
              Swal.fire({
                title: 'Failed!',
                html: `The domain you have selected cannot be deleted.`,
                icon: 'error',
                confirmButtonColor: '#673ab7',
                confirmButtonText: 'Ok, Close'
              });
            }
          },
          error: (err) => {
            Swal.fire({
              title: 'Failed!',
              html: `The screen you have selected cannot be deleted.`,
              icon: 'error',
              confirmButtonColor: '#f41a7b',
              confirmButtonText: 'Ok, Close'
            });
          },

        });
      }
    });

  }

}

