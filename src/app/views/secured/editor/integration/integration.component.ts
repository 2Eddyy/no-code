import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import Drawflow from 'drawflow';
import { IntegrationService } from './integration.service';
import { EditorService } from '../editor.service';
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit   {
  isExpanded = false;
  isFullscreen = false;

  elementRef: any;
  nodes = [{
    infos: {
      name : 'Event',
    },
    outputs : 1,
    inputs :0
  },{
    infos: {
      name : 'Receive Event',
      type :'Events'
    },
    outputs : 1,
    inputs :0
  },{
    infos: {
      name : 'Trigger Event',
      type :'Events'
    },
    outputs : 1,
    inputs :0
  },{
    infos: {
      name : 'Push Page',
      type :'Navigations'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Pop Page',
      type :'Navigations'
    },
    outputs : 0,
    inputs :1
  },{
    infos: {
      name : 'Global Variable',
      type :'Variables'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Screen Variable',
      type :'Variables'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Local Variable',
      type :'Variables'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Toast',
      type :'Alerts'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Alert',
      type :'Alerts'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Confirmation',
      type :'Alerts'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Show spinner',
      type :'Feedbacks'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Hide spinner',
      type :'Feedbacks'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Delay',
      type :'Timers'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Repeat',
      type :'Timers'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'AJAX',
      type :'Service'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Javascript Editor',
      type :'Script'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'Switch',
      type :'Conditions'
    },
    outputs : 1,
    inputs :1
  },{
    infos: {
      name : 'If Condition',
      type :'Conditions'
    },
    outputs : 2,
    inputs :1
  },]

  CoreList = [{
    nameList : [{
      name : 'Push Page',
      icon : 'assets/images/integration/open_page.svg'
    },{
      name : 'Pop Page',
      icon : 'assets/images/integration/navigate_back.svg'
    }],
    name : 'Navigations'
  },{
    nameList : [{
      name : 'Global Variable',
      icon : 'assets/images/integration/set_app_variable.svg'
    },{
      name : 'Screen Variable',
      icon : 'assets/images/integration/set_page_variable.svg'
    },{
      name : 'Local Variable',
      icon : 'assets/images/integration/set_data_variable.svg'
    }],
    name : 'Variables'
  },{
    nameList : [{
      name : 'Toast',
      icon : 'assets/images/integration/toast.svg'
    },{
      name : 'Alert',
      icon : 'assets/images/integration/alert.svg'
    },{
      name : 'Confirmation',
      icon : 'assets/images/integration/confirm.svg'
    }],
    name : 'Alerts'
  },{
    nameList : [{
      name : 'Show spinner',
      icon : 'assets/images/integration/show_spinner.svg'
    },{
      name : 'Hide spinner',
      icon : 'assets/images/integration/hide_spinner.svg'
    }],
    name : 'Loading'
  },{
    nameList : [{
      name : 'Delay',
      icon : 'assets/images/integration/get_record.svg'
    },{
      name : 'Repeat',
      icon : 'assets/images/integration/create_record.svg'
    }],
    name : 'Timers'
  },{
    nameList : [{
      name : 'Receive Event',
      icon : 'assets/images/integration/scan_qr.svg'
    },{
      name : 'Trigger Event',
      icon : 'assets/images/integration/take_photo.svg'
    }],
    name : 'Events'
  },{
    nameList : [{
      name : 'Switch',
      icon : 'assets/images/integration/delay.svg'
    },{
      name : 'If Condition',
      icon : 'assets/images/integration/if_condition.svg'
    }],
    name : 'Conditions'
  },{
    nameList : [{
      name : 'Javascript Editor',
      icon : 'assets/images/integration/delay.svg'
    }],
    name : 'Script'
  },
  {
    nameList : [{
      name : 'AJAX',
      icon : 'assets/images/integration/delay.svg'
    }],
    name : 'Service'
  }]
  
  showNodes: false
  @Input()  drawingData: string;
  editDivHtml: HTMLElement;
  editButtonShown: boolean = false;

  selectedNodeId: string;
  selectedNode: any = {};

  nodeModal: ElementRef;
  @ViewChild('content') set setNodeModal(el: ElementRef) {
    this.nodeModal = el;
  }

  constructor(private modalService: NgbModal, public integrationService:IntegrationService, public editService: EditorService) {}

  // Private functions
  public initDrawFlow(): void {
    console.log('start')
    const drawFlowHtmlElement = <HTMLElement>document.getElementById('drawflow');

    const testEditor = new Drawflow(drawFlowHtmlElement);
    // testEditor.addConnection();

    this.integrationService.editor = new Drawflow(drawFlowHtmlElement);

    this.integrationService.editor.reroute = true;
    this.integrationService.editor.curvature = 0.5;
    this.integrationService.editor.reroute_fix_curvature = true;
    this.integrationService.editor.reroute_curvature = 0.5;
    this.integrationService.editor.force_first_input = false;
    this.integrationService.editor.line_path = 1;
    this.integrationService.editor.editor_mode = 'edit';

    this.integrationService.editor.start();

    /*
    if (this.drawingData && Object.keys(JSON.parse(this.drawingData).drawflow.Home.data).length > 0) {
      console.log('this.drawingData :>> ', this.drawingData);
      this.integrationService.editor.import(JSON.parse(this.drawingData));
    }
    */
  }
  private reestablishOldConnections(oldNode: any, newNodeId: number) {
    Object.keys(oldNode.inputs).forEach((inputKey) => {
      oldNode.inputs[`${inputKey}`].connections.forEach((connection: any) => {
        this.integrationService.editor.addConnection(connection.node, newNodeId, connection.input, inputKey);
      });
    });

    Object.keys(oldNode.outputs).forEach((outputKey) => {
      oldNode.outputs[`${outputKey}`].connections.forEach((connection: any) => {
        this.integrationService.editor.addConnection(newNodeId, connection.node, outputKey, connection.output);
      });
    });
  }
 

  private addEditorEvents() {
    // Events!
    this.integrationService.editor.on('nodeCreated', (id: any) => {
      console.log('Editor Event :>> Node created ' + id, this.integrationService.editor.getNodeFromId(id));
    });

    this.integrationService.editor.on('nodeRemoved', (id: any) => {
      console.log('Editor Event :>> Node removed ' + id);
    });

    this.integrationService.editor.on('nodeSelected', (id: any) => {
      console.log('Editor Event :>> Node selected ' + id, this.integrationService.editor.getNodeFromId(id));
      this.selectedNode = this.integrationService.editor.drawflow.drawflow.Home.data[`${id}`];
      console.log('Editor Event :>> Node selected :>> this.selectedNode :>> ', this.selectedNode);
    });

    this.integrationService.editor.on('click', (e: any) => {
      
      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.integrationService.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];
      }
      if (e.target.closest('#editNode') != null || e.target.classList[0] === 'edit-node-button') {
        // Open modal with Selected Node
      }
     this.openIntegrationProp(this.selectedNode.name)
    });

    this.integrationService.editor.on('moduleCreated', (name: any) => {
      console.log('Editor Event :>> Module Created ' + name);
    });

    this.integrationService.editor.on('moduleChanged', (name: any) => {
      console.log('Editor Event :>> Module Changed ' + name);
    });

    this.integrationService.editor.on('connectionCreated', (connection: any) => {
      // console.log('Editor Event :>> Connection created ', connection);
      console.log(parseInt(connection.input_id),parseInt(connection.output_id),connection.output_class,connection.input_class)

    });

    this.integrationService.editor.on('connectionRemoved', (connection: any) => {
      console.log('Editor Event :>> Connection removed ', connection);
    });

    this.integrationService.editor.on('contextmenu', (e: any) => {
      console.log('Editor Event :>> Context Menu :>> ', e);

      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.integrationService.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];

      }
    });

    this.integrationService.editor.on('zoom', (zoom: any) => {
      console.log('Editor Event :>> Zoom level ' + zoom);
    });

    this.integrationService.editor.on('addReroute', (id: any) => {
      console.log('Editor Event :>> Reroute added ' + id);
    });

    this.integrationService.editor.on('removeReroute', (id: any) => {
      console.log('Editor Event :>> Reroute removed ' + id);
    });

    // this.integrationService.editor.on('mouseMove', (position: any) => {
    //   console.log('Editor Event :>> Position mouse x:' + position.x + ' y:' + position.y);
    // });

    this.integrationService.editor.on('nodeMoved', (id: any) => {
      console.log('Editor Event :>> Node moved ' + id);
    });

    this.integrationService.editor.on('translate', (position: any) => {
      console.log(
        'Editor Event :>> Translate x:' + position.x + ' y:' + position.y
      );
    });
  }

  public initDrawingBoard() {
    this.initDrawFlow();
      this.addEditorEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes :>> ', changes);

    if (
      changes['drawingData'] &&
      changes['drawingData'].currentValue &&
      changes['drawingData'].currentValue.length > 0 &&
      Object.keys(JSON.parse(changes['drawingData'].currentValue).drawflow.Home.data).length > 0
    ) {
      this.integrationService.editor.import(JSON.parse(changes['drawingData'].currentValue));
    }
  }

  resizableElement:any;
  ngOnInit(): void {
    this.resizableElement = document.querySelector('.content');
  }
 
  beginResize(event:any){
    this.resizableElement.style.height = event.clientY + 'px';
  }

  onDrawflowEvent(e: any) {
    console.log(e.type)
    switch (e.type) {
      case 'dragstart':
        console.log( e.target.outerText)
        this.selectedNode.data = JSON.parse(
          JSON.stringify([...this.nodes].find((node) => node.infos.name === e.target.outerText))
        );
        break;
      case 'dragenter':
        console.log('Drawflow Event: DragEnter :>> e :>> ', e);
        break;
      case 'dragover':
        // console.log('Drawflow Event: DragOver :>> e :>> ', e);
        e.preventDefault();
        e.stopPropagation();
        break;
      case 'dragleave':
        // console.log('Drawflow Event: DragLeave :>> e :>> ', e);
        break;
      case 'drop':
        console.log('Drawflow Event: Drop :>> e :>> ', e);
        e.preventDefault();
        this.addNodeToDrawBoard(e.clientX, e.clientY);
        break;

      default:
        console.log('Other Drawflow Event :>> e :>> ', e);
        break;
    }
  }

  // Drawflow Editor Operations
  addNodeToDrawBoard(pos_x: number, pos_y: number) {
    if (this.integrationService.editor.editor_mode === 'edit') {
      pos_x =
        pos_x * (this.integrationService.editor.precanvas.clientWidth / (this.integrationService.editor.precanvas.clientWidth * this.integrationService.editor.zoom)) -
        this.integrationService.editor.precanvas.getBoundingClientRect().x *
          (this.integrationService.editor.precanvas.clientWidth / (this.integrationService.editor.precanvas.clientWidth * this.integrationService.editor.zoom)) 

      pos_y =
        pos_y * (this.integrationService.editor.precanvas.clientHeight / (this.integrationService.editor.precanvas.clientHeight * this.integrationService.editor.zoom)) -
        this.integrationService.editor.precanvas.getBoundingClientRect().y *
          (this.integrationService.editor.precanvas.clientHeight / (this.integrationService.editor.precanvas.clientHeight * this.integrationService.editor.zoom));

      const htmlTemplate = `<div class="node-box">
      <div class="dark-blue node-style">${this.selectedNode.data.infos.type} </div>
      <div class="light-blue node-style">${this.selectedNode.data.infos.name} </div>
      </div>`;

      this.integrationService.editor.addNode(
        this.selectedNode.data.infos.name,
        this.selectedNode.data.inputs,
        this.selectedNode.data.outputs,
        pos_x,
        pos_y,
        '',
        this.selectedNode.data,
        htmlTemplate,
        false
      );
     this.openIntegrationProp(this.selectedNode.data.infos.name)

    }
  }

  openIntegrationProp(name:string){
    console.log(name)
    this.editService.selectedType.next('integration')
    this.editService.integrationType.next(name)
  }

  onClear() {
    this.integrationService.editor.clear();
  }

  onZoomOut() {
    this.integrationService.editor.zoom_out();
  }

  onZoomIn() {
    this.integrationService.editor.zoom_in();
  }

  onZoomReset() {
    this.integrationService.editor.zoom_reset();
  }

  exportDrawingData() {
    return this.integrationService.editor.export();
  }

  onSubmit() {
    this.drawingData = this.exportDrawingData();
    console.log(this.drawingData)
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    console.log(this.integrationService.editor)
    if(this.integrationService.isEditorRender){
      this.integrationService.isEditorRender = false
      this.initDrawingBoard();
    }
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
 
}


