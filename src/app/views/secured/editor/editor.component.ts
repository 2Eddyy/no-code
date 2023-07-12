import {
  Component, ElementRef, Injectable, Input, NgZone,
  OnDestroy,
  OnInit, Renderer2,
  ViewChild
} from '@angular/core';
import { EditorService } from './editor.service';
import { skipUntil, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';
import { LibraryService } from './panels/library/library.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, LoadChildren, Router } from '@angular/router';
import { HighlightBoxComponent } from './components/ui/select/highlight-box/highlight-box.component';
import { SelectBoxComponent } from './components/ui/select/select-box/select-box.component';
import { HttpClient } from '@angular/common/http';
import { BoodskapService } from 'src/app/services/boodskap.services';
import { CommonDataService } from 'src/app/services/commondata.service';
import { ScreenModel } from '../../../models/ScreenModel';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateScreenModal } from './create-screen/create-screen.component';
import { LoadingIndicatorService } from 'src/app/services/loading-indicator.service';
import { ScreensListModel } from './screens-list/screens-list.component';
import { IntegrationService } from './integration/integration.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('highlight', { static: true }) highlight: HighlightBoxComponent;
  @ViewChild('selectBox', { static: true }) selectBox: SelectBoxComponent;
  @ViewChild('iconDrag', { static: true }) iconDrag: ElementRef;

  @ViewChild('iframe', { static: true }) iframe: ElementRef;
  isExpanded = false;
  isFullscreen = false;

  isUIView: boolean = true;
  private unsubscribe: Subject<any> = new Subject<any>();
  private userObj: any;
  private user_subs: any;
  public dragIcon = '';
  public isPreviewMode = false;
  public selectedElement: HTMLElement;
  public showBorders = '1';
  public srcDocContent = '';
  public isDragging = false;
  public elementInfo = {
    name: '',
    type: '',
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    display: 'none'
  };
  private contentArea: any;
  private mousedown$: Observable<MouseEvent>;
  private mouseup$: Observable<MouseEvent>;
  private mousemove$: Observable<MouseEvent>;
  private elementMouseIsOver: HTMLElement;
  private dragElement: any = null;
  isPubEnable: boolean = true;
  selectedResolution: string = "768 x 1024";
  originalWindowSize: { width: number, height: number };
  screenCategory: string = "";
  projectId: string = "";
  screenTags: string = "";
  screenId: string = "";
  selectedScreenObj: ScreenModel;
  modalRef: any;
  selectedScreenId: any = "";
  screenName: string = "";
  screenImage: string = "";
  screenItems: Array<string> = [];
  screenVersion: string = "";
  screenCode: any = "";
  screenConfig: string = "";
  screenDesc: string = "";
  screensList: Array<ScreenModel> = [];
  screenMarket: string = "";
  modalClose: Boolean = true;
  modalOpen: boolean = false;
  public listArray: any;
  public getScreenUI: any;
  public getScreenName: any;
  public getScreenId: any;
  public defaultScreenName: any;
  public script_code: any;
  laptopMode: boolean = true;
  tabletMode: boolean = false;
  mobileMode: boolean = false;
  refreshPage: boolean = false;
  currentArr: any = []
  data: any = '';
  history: string[] = [];
  currentIndex: number = -1;
  defaultScreenId: any;
  sortArray: any;
  resolutions = [{
    label: 'Desktop/Laptop', items: [{ label: '1920 x 1080', value: '1920x1080' }, { label: '1366 x 768', value: '1366x768' }, { label: '1280 x 800', value: '1280x800' }, { label: '1440 x 900', value: '1440x900' }]
  },
  {
    label: 'Tablet',
    items: [
      { label: '768 x 1024 (iPad portrait)', value: '768x1024' },
      { label: '1024 x 768 (iPad landscape)', value: '1024x768' },
      { label: '800 x 1280 (Samsung Galaxy Tab portrait)', value: '800x1280' },
      { label: '1280 x 800 (Samsung Galaxy Tab landscape)', value: '1280x800' }
    ]
  },
  {
    label: 'Mobile',
    items: [
      { label: '320 x 568 (iPhone 5/SE)', value: '320x568' },
      { label: '375 x 667 (iPhone 6/7/8)', value: '375x667' },
      { label: '414 x 896 (iPhone XR/XS Max/11 Pro Max)', value: '414x896' },
      { label: '360 x 640 (Samsung Galaxy S4/S5/S6)', value: '360x640' }
    ]
  }
  ];
  app_id: any
  project_details: any
  setResponsive(size: any) {
    console.log(size.value);
    const element = this.elementRef.nativeElement.querySelector('#content');

    if (size.value == "320x568") {
      this.renderer.setStyle(element, 'width', '320px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "375x667") {
      this.renderer.setStyle(element, 'width', '375px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "414x896") {
      this.renderer.setStyle(element, 'width', '414px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "360x640") {
      this.renderer.setStyle(element, 'width', '360px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "768x1024") {
      this.renderer.setStyle(element, 'width', '768px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "1024x768") {
      this.renderer.setStyle(element, 'width', '920px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "800x1280") {
      this.renderer.setStyle(element, 'width', '800px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "1920x1080") {
      this.renderer.setStyle(element, 'width', '910px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "1366x768") {
      this.renderer.setStyle(element, 'width', '890px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else if (size.value == "1280x800") {
      this.renderer.setStyle(element, 'width', '900px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }


  }

  onResolutionSelect(resolution: any) {

    console.log(resolution);

    this.selectedResolution = resolution;
  }
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
  toggleFullscreen() {
    const elem = this.elementRef.nativeElement.querySelector('#fullscreenDiv');
    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    this.isFullscreen = !this.isFullscreen;
  }
  get workareaWidth() {
    if (!this.selectedResolution) return 0;

    const [resWidth, resHeight] = this.selectedResolution.split('x').map(Number);
    const originalAspectRatio = this.originalWindowSize.width / this.originalWindowSize.height;
    const resolutionAspectRatio = resWidth / resHeight;
    const maxWidthPercentage = 90; // maximum workarea width as a percentage of the window width

    if (originalAspectRatio > resolutionAspectRatio) {
      // Original window is wider than selected resolution, so set width to the original window width * resolution aspect ratio
      const widthPercentage = (resWidth / this.originalWindowSize.width) * 100;
      return Math.min(widthPercentage, maxWidthPercentage);
    } else {
      // Original window is taller than selected resolution, so set height to the original window height * max width / resolution width
      const maxHeight = (this.originalWindowSize.width * resHeight) / resWidth;
      const heightPercentage = (maxHeight / this.originalWindowSize.height) * 100;
      return Math.min(heightPercentage, maxWidthPercentage);
    }
  }

  get workareaHeight() {
    if (!this.selectedResolution) return 0;

    const [resWidth, resHeight] = this.selectedResolution.split('x').map(Number);
    const originalAspectRatio = this.originalWindowSize.width / this.originalWindowSize.height;
    const resolutionAspectRatio = resWidth / resHeight;
    const maxHeightPercentage = 90; // maximum workarea height as a percentage of the window height

    if (originalAspectRatio > resolutionAspectRatio) {
      // Original window is wider than selected resolution, so set height to the original window height * max width / resolution width
      const maxWidth = (this.originalWindowSize.height * resWidth) / resHeight;
      const widthPercentage = (maxWidth / this.originalWindowSize.width) * 100;
      return Math.min(widthPercentage, maxHeightPercentage);
    } else {
      // Original window is taller than selected resolution, so set height to the original window height * resolution aspect ratio
      const heightPercentage = (resHeight / this.originalWindowSize.height) * 100;
      return Math.min(heightPercentage, maxHeightPercentage);
    }
  }

  last(item: any, arr: any) {
    return item === arr[arr.length - 1];
  }

  constructor(private router: Router,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private modalService: NgbModal,
    private editorSrv: EditorService,
    private boodskapService: BoodskapService,
    private commonDataService: CommonDataService,
    private loadingService: LoadingIndicatorService,
    private librarySrv: LibraryService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private route: Router,
    private integrationService: IntegrationService) { }

  getCurrentResolution(): string {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.selectedResolution = `${width}x${height}`;
    return `${width}x${height}`;
  }

  check: boolean = false;
  publishApp() {
    let flowObj = this.integrationService.editor.export()
    let flowObjArray = eval(flowObj.drawflow.Home.data)
    console.log(flowObjArray)

    //   for (const [key, value] of Object.entries(flowObjArray)) {
    //     console.log(value['name'])

    // }
    for (var key in flowObjArray) {
      // skip loop if the property is from prototype
      if (!flowObjArray.hasOwnProperty(key)) continue;
      let obj = flowObjArray[key];
      console.log(obj)
      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop) && prop == 'name') continue;
        let script_tag = document.createElement('script')
        script_tag.innerHTML = 'var a=20'
        switch (obj[prop]) {
          case 'Event': {
            let eventName = 'triggerEvent'
            this.script_code = `var val = 90;
                function `+ eventName + `(){
                  
                  console.log(val)
                 
                }`
            script_tag.innerHTML = this.script_code
            this.contentArea.append(script_tag)
            console.log(this.contentArea)
            break;
          }
          case 'Push Page': {
            console.log('Push Page')
            break;
          }
          case 'Pop Page': {
            console.log('Pop Page')
            break;
          }
        }

      }
    }

  }

  ngOnDestroy() {
    this.unsubscribe.next;
    this.unsubscribe.complete();
  }

  deleteScreen() {
    Swal.fire({
      title: 'Are you sure?',
      html: `Screen  <code><i class="fas fa-file-alt"></i> ${this.getScreenName ? this.getScreenName : this.defaultScreenName ? this.defaultScreenName : "N/A"}</code> <br> will the permanently deleted from the system.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#666666',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.boodskapService.deleteScreenAPI(this.selectedScreenId).subscribe({
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
                this.screensList = []
                this.getScreensList()
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
          complete: () => { }
        });
      }
    });
  }

  openModal(action: string) {
    if (action === "create") {
      const options: NgbModalOptions = {
        size: 'md',
        backdrop: 'static',
        keyboard: false
      };
      let modalRef = this.modalService.open(CreateScreenModal, options);
      console.log(this.editorSrv.app_id)
      modalRef.componentInstance.selectedScreenObj = {
        "app_id": this.editorSrv.app_id,
        "type": 'add',
      };
      this.modalRef = modalRef;

    } else if (action === "edit") {

      const options: NgbModalOptions = {
        size: 'md',
        backdrop: 'static',
        keyboard: false
      };
      let modalRef = this.modalService.open(CreateScreenModal, options);
      modalRef.componentInstance.selectedScreenObj = this.selectedScreenObj;

      this.modalRef = modalRef;


    } else if (action === "delete") {

    } else if (action === "publish") {

    } else if (action === "preview") {

    } else if (action === "screens_list") {
      this.modalClose = false;
      this.modalOpen = true;
      const options: NgbModalOptions = {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      };
      this.modalService.open(ScreensListModel, options);

    }
  }
  screensModel() {

    this.modalClose = false;

    this.modalOpen = true;
    const options: NgbModalOptions = {
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(ScreensListModel, options);
  }
  saveScreen() {
    if (this.selectedScreenObj && this.selectedScreenObj.screenname) {
      this.screenCode = this.getSourceCode();
      let screenObj: ScreenModel = {
        "domainKey": this.userObj.domainKey,
        "clientDomainKey": this.screenCategory,
        "category": this.selectedScreenObj.category,
        "tags": this.selectedScreenObj.tags,
        "screenid": this.selectedScreenObj.screenid,
        "screenname": this.selectedScreenObj.screenname,
        "app_id": this.editorSrv.app_id,
        "screenimage": this.selectedScreenObj.screenimage,
        "screenitems": this.selectedScreenObj.screenitems,
        "version": this.selectedScreenObj.version,
        "code": this.screenCode ? JSON.stringify(this.screenCode) : "dwwd",
        "createdby": this.userObj.user.firstName + " " + this.userObj.user.lastName,
        "createdbyemail": this.userObj.user.email,
        "createdtime": this.selectedScreenObj.createdtime,
        "updatedtime": new Date().getTime(),
        "importedtime": this.selectedScreenObj.importedtime,
        "config": this.selectedScreenObj.config,
        "description": this.selectedScreenObj.description,
        "market": this.selectedScreenObj.market,
        "type": 'update'
      };
      this.loadingService.show(true);
      if (this.getScreenUI) {


        this.getScreenUI.screenname = this.getScreenName;
        this.getScreenUI.code = JSON.stringify(this.screenCode);
      }
      this.boodskapService.upsertScreenAPI(this.getScreenUI ? this.getScreenUI : screenObj).subscribe({
        next: (res) => {
          this.loadingService.show(false);
          Swal.fire({
            title: 'Success!',
            html: `Screen updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });
        },
        error: (err) => {
          this.loadingService.show(false);
          Swal.fire({
            title: 'Failed!',
            html: `Screen update failed.`,
            icon: 'error',
            confirmButtonColor: '#f41a7b',
            confirmButtonText: 'Ok, Close'
          });
        },
        complete: () => { }
      });
    }
    else {
      Swal.fire({
        title: 'Error!',
        html: `Screen name is required.`,
        icon: 'error',
        confirmButtonColor: '#f41a7b',
        confirmButtonText: 'Ok, Close'
      });
    }
  }

  public getScreensList() {
    this.user_subs = this.commonDataService.user$.subscribe((value) => {
      this.userObj = value;
    })
    let screenQuery = {
      "query": {
        "bool": {
          "must": [{
            "match": {
              "domainKey": this.userObj.domainKey
            }
          }, {
            "match": {
              "tags": this.editorSrv.app_id
            }
          }]
        }
      },
      "from": 0,
      "size": 1000
    };

    let searchQuery: any = {
      "method": "GET",
      "extraPath": "",
      "query": JSON.stringify(screenQuery),
      "params": [],
      "type": "SCREEN"
    }

    this.boodskapService.elasticSearchQueryAPI(searchQuery).subscribe({
      next: (res) => {
        this.screensList = res.data.data;
        let data = this.screensList
        this.editorSrv.ScreenList = data
        this.editorSrv.ScreenListSubject.next(this.screensList)


        if (this.screensList.length > 0) {
          this.selectedScreenId = this.screensList[0].screenid
          this.selectedScreenObj = this.screensList[0];
          this.defaultScreenName = this.selectedScreenObj.screenname
          this.defaultScreenId = this.selectedScreenObj.screenid

          this.screenLoader();
        } else {
          this.selectedScreenId = null;
        }
      },
      error: (err) => {
        console.log("searchScreenByQueryAPI=>err");
        console.log(err);
      },
      complete: () => { }
    })
  }

  public screenLoader() {
    this.contentArea.innerHTML = this.selectedScreenObj.code ? JSON.parse(this.selectedScreenObj.code) : "";
  }

  public switchToScreen(oneScreen: ScreenModel) {
    this.selectedScreenObj = oneScreen;
    this.selectedScreenId = this.selectedScreenObj.screenid
    this.screenLoader();
  }

  searchQueryFormatterNew(data: any) {

    let resultObj: any = {
      total: 0,
      data: {},
      aggregations: {}
    }

    if (data.httpCode === 200) {

      let arrayData = JSON.parse(data.result);

      let totalRecords = arrayData.hits.total ? arrayData.hits.total.value : 0;
      let records = arrayData.hits.hits;

      let aggregations = arrayData.aggregations ? arrayData.aggregations : {};

      let count = 0;

      let tempData = []

      for (const element of records) {
        if (element['_id'] != '_search') {
          element['_source']['_id'] = element['_id'];
          tempData.push(element['_source']);
        } else {
          count++;
        }
      }

      totalRecords = totalRecords > 0 ? totalRecords - count : 0
      resultObj = {
        "total": totalRecords,
        "data": {
          "recordsTotal": totalRecords,
          "recordsFiltered": totalRecords,
          "data": tempData
        },
        aggregations: aggregations,
        scroll_id: arrayData['_scroll_id'] ? arrayData['_scroll_id'] : null
        // data : _.pluck(records, '_source')
      }


      return resultObj;

    } else {

      return resultObj;
    }
  }

  private register() {
    this.mousemove$ = new Observable(() => { });

    this.ngZone.runOutsideAngular(() => {
      this.mousemove$ = fromEvent(this.contentArea, 'mousemove');
    });

    this.mousemove$ = this.mousemove$.pipe(skipUntil(this.mousedown$));
    this.mousemove$ = this.mousemove$.pipe(takeUntil(this.mouseup$));
    this.mousemove$.subscribe((e: any) => {
      this.handleMouseMove(e);
    });
  }

  public drop(data: any) {
    if (!data) {
      return;
    }
    this.elementMouseIsOver.append(this.librarySrv.component(data));
    const nodeList = this.elementMouseIsOver.children[0];

    this.editorSrv.dragElement_1.next(nodeList)
    this.dragElement = null;
    this.isDragging = false;
  }

  public handleMouseMove(evt: MouseEvent) {

    if (this.dragElement) { this.isDragging = true; }
    if (this.isDragging) {
      this.renderer.setStyle(this.iconDrag.nativeElement, 'left', `${evt.clientX - 60}px`);
      this.renderer.setStyle(this.iconDrag.nativeElement, 'top', `${evt.clientY - 55}px`);
    }

    this.ngZone.runOutsideAngular(() => {
      this.elementMouseIsOver = document.elementFromPoint(evt.clientX, evt.clientY) as HTMLElement;
    });

    const el = evt.composedPath()[0];
    if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
      this.elementInfo = this.setElementInfo(el);
    }
    // Cancel Bubble and Prevent Default
    if (this.selectedElement) {
      if (!this.selectedElement.contentEditable) {
        // evt.cancelBubble = true;
        evt.stopPropagation();
        evt.preventDefault();
      }
    } else {
      // evt.cancelBubble = true;
      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  public updateSelectionBox() {
    setTimeout(() => {
      this.elementInfo = this.setElementInfo(this.selectedElement);
      this.selectBox.setBounds(this.elementInfo);
    }, 5);
  }

  public setPreviewMode(): boolean {
    const previewMode = this.isPreviewMode = !this.isPreviewMode;
    if (previewMode) {
      // TODO: FIX THIS... come up with better solution
      // document.getElementById('select_box').style.display = 'none';
      const selectBox = document.getElementById('select_box');
      if (selectBox) {
        selectBox.style.display = 'none';
      }

      const content = this.contentArea as HTMLElement;
      // TODO: NEED TO MAKE THIS CLEANER...
      this.srcDocContent = `
        <html>
          <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
                html {
                  margin: 0;
                  width: 100%;
                  height: 100%;
                }
                body {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #212529;
                    text-align: left;
                    background-color: #fff;
                }
                .main {
                  width: 100%;
                  height: 100%;
                }
                #content {
                  display: flex;
                  flex-direction: row;
                  flex-flow: wrap;
                  justify-items: flex-start;
                  align-items: flex-start;
                  background-color: white;
                  height: auto;
                  overflow: scroll;
                  overflow-x: hidden;
                }
            </style>
          </head>
          <body>
            <div class="main" id="main">
              ${content.outerHTML}
            </div>
            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>  
            <script>
            `+ this.script_code + `</script>
          </body>
        </html>
      `;
    }
    return previewMode;
  }

  getSourceCode() {

    const content = this.contentArea as HTMLElement;
    // TODO: NEED TO MAKE THIS CLEANER...
    return content.outerHTML;
  }

  public setBordersMode() {
    this.showBorders = this.showBorders === '1' ? '0' : '1';
    const ele = document.querySelectorAll('[data-item-border]');
    ele.forEach(e => {
      e.attributes[1].value = this.showBorders;
    });
  }

  //  Editor Undo

  undo() {
    if (this.currentIndex > -1) {
      this.currentIndex--;

      this.data = this.sortArray[this.currentIndex];
      this.data as HTMLElement
      this.contentArea.innerHTML = this.data ? this.data : JSON.parse(this.selectedScreenObj.code) as HTMLElement


    }
  }
  //  Editor Redo

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.data = this.sortArray[this.currentIndex];
      this.data as HTMLElement
      this.contentArea.innerHTML = (this.data ? this.data : JSON.parse(this.selectedScreenObj.code) as HTMLElement);
    }
  }
  // latopView() {
  //   const element = this.elementRef.nativeElement.querySelector('#content');


  // }
  mobileView() {
    this.laptopMode = false;
    this.tabletMode = false;

    (this.mobileMode = !this.mobileMode);


    const element = this.elementRef.nativeElement.querySelector('#content');

    if (this.mobileMode) {
      this.renderer.setStyle(element, 'width', '365px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else {
      this.laptopMode = true;
      this.tabletMode = false
      this.renderer.setStyle(element, 'width', '100%');

    }
  }

  tabletView() {
    this.laptopMode = false;
    this.mobileMode = false;

    (this.tabletMode = !this.tabletMode);


    const element = this.elementRef.nativeElement.querySelector('#content');

    if (this.tabletMode) {
      this.renderer.setStyle(element, 'width', '666px');
      this.renderer.setStyle(element, 'height', '468px');
      this.renderer.setStyle(element, 'margin', 'auto');
    }
    else {
      this.laptopMode = true;

      this.renderer.setStyle(element, 'width', '100%');

    }







  }
  refresh() {
    this.refreshPage = true;

    setTimeout(() => {
      this.getScreensList();
      this.refreshPage = false;

    }, 1000);


  }
  public handleMouseUp(evt: MouseEvent) {

    //  Editor store Data

    this.screenCode = this.getSourceCode();
    const uniqueParagraphs = new Set<string>();
    this.history = this.history.slice(0, this.currentIndex + 1);

    this.history.push(this.screenCode);
    this.history.forEach((paragraph: string) => uniqueParagraphs.add(paragraph));
    this.sortArray = (Array.from(uniqueParagraphs));

    if (this.sortArray.length > this.currentIndex) {
      this.currentIndex++;
    }
    //  Editor store Data end //


    evt.stopPropagation();
    evt.preventDefault();
    // this.selectBox.htmlEle.style.display = '';
    if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
      if (this.selectedElement !== this.elementMouseIsOver) {
        this.elementMouseIsOver.contentEditable = 'false';
      }
      this.selectedElement = this.elementMouseIsOver;
      // this.editorSrv.selectedElement.next(this.selectedElement);

      // TODO: FIX THIS...
      // document.getElementById('select_box').style.display = 'block';

      const selectBox = document.getElementById('select_box');
      if (selectBox) {
        selectBox.style.display = 'block';
      }

      this.updateSelectionBox();

    }
  }

  public gotoDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  private setElementInfo(el: any) {
    const { bottom, height, left, right, top, width, x, y } = el.getBoundingClientRect();
    return {
      name: el.nodeName,
      type: '',
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
      display: 'block'
    };
  }

  ngOnInit() {
    this.editorSrv.inputname
    this.originalWindowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    window.addEventListener('resize', () => {
      this.originalWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    });

    this.getCurrentResolution();
    this.editorSrv.dragElement
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s: { id: string, icon: string }) => {
        if (!s) { return; }
        if (s.id === '') {
          this.dragElement = null;
          this.isDragging = false;
        } else {
          this.dragElement = s.id;
        }
        this.dragIcon = s.icon;
      });

    this.contentArea = document.querySelector('#content');

    console.log("content", this.contentArea);

    this.mousedown$ = fromEvent(this.contentArea, 'mousedown');
    this.mouseup$ = fromEvent(this.contentArea, 'mouseup');

    this.mousedown$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this.dragElement) {
          this.isDragging = true;
          this.isPubEnable = false;
        }
      });

    this.mouseup$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((evt: MouseEvent) => {
        if (!this.mousemove$) { this.register(); }
        this.drop(this.dragElement);
        this.isPubEnable = false;
        // evt.cancelBubble = true;
        evt.stopPropagation();
        evt.preventDefault();
      });

    fromEvent(this.contentArea, 'scroll')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
          this.updateSelectionBox();
        }
      });

    this.user_subs = this.commonDataService.user$.subscribe((value) => {
      this.userObj = value;

    });
    this.activatedRoute.queryParams.subscribe(params => {
      const appId = params['appId'];
      const projectName = params['projectName'];

      // Use the retrieved values as needed
      this.editorSrv.app_id = appId
      this.app_id = appId
      this.project_details = projectName
    });

    this.getScreensList();
    this.editorSrv.ScreenListSubject.subscribe(res => {

    })
    this.editorSrv.setScreenData.subscribe(res => {
      this.getScreenUI = res



      this.getScreenName = this.getScreenUI.screenname;

      this.editorSrv.editValue = this.getScreenName
      this.contentArea.innerHTML = this.getScreenUI.code ? JSON.parse(this.getScreenUI.code) : "";


    })
    console.log(this.getScreenUI);

  }
}
