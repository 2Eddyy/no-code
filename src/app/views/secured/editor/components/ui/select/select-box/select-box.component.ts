import { Component, Input, OnInit } from '@angular/core';
import { IntegrationComponent } from '../../../../integration/integration.component';
import { IntegrationService } from '../../../../integration/integration.service';
import { EditorService } from '../../../../editor.service';
@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  public htmlEle: HTMLElement;
  public selectActions: any;
  public textEditor: any;
  @Input() set element(val: HTMLElement) {
    if (this.htmlEle) {
    
      // console.log('A value', a);

      console.log(val.id);
      if (this.integrationService.isEditorRender) {
        this.integrationService.isEditorRender = false;
        this.integration.initDrawingBoard();
      }
      let current_id = val.id;
      let nodeName: string | any[] = [];
      let nodeType = 'Event';
      if (val.tagName == 'BUTTON') {
        nodeName = ['Component tap'];
      console.log(val.setAttribute('onclick','triggerEvent()'));

      } else if (val.tagName == 'INPUT') {
        let a = ('var objname = ' + document.getElementById(val.id)) as any;
        a.value = 'Input field 1';
        // nodeName = ['Component tap','Component onBlur','Component onFocus','Component onChange']
      }
      console.log(nodeName)
      if (nodeName.length > 0) {
        for (let [index, element] of nodeName.entries()) {
          const htmlTemplate =
            `<div class="node-box">
        <div class="dark-blue node-style">` +
            nodeType +
            ` </div>
        <div class="light-blue node-style">` +
            element +
            `</div>
        </div>`;
          this.integrationService.editor.addNode(
            'Event',
            0,
            1,
            20,
            45 * (index + 1),
            '',
            {
              infos: {
                name: element,
                element_id: current_id,
              },
              outputs: 1,
              inputs: 0,
            },
            htmlTemplate,
            false
          );
        }
      }

      const selectBox = document.getElementById('select_box');
      this.selectActions = document.getElementById('select_actions');
      this.textEditor = document.getElementById('text_editor');
      this.htmlEle.contentEditable = 'false';
      this.selectActions.style.display = 'flex';
      this.textEditor.style.display = 'none';
      if (selectBox) {
        selectBox.style.border = '1px solid #17a2b8';
      }
    }

    this.htmlEle = val;
  }

  public bounds = {
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
    display: 'none',
  };
  constructor(
    private integration: IntegrationComponent,
    public integrationService: IntegrationService,
    public editorService:EditorService
  ) {}

  @Input() set boundBox(box: any) {
    this.bounds = box;
  }

  ngOnInit() {}

  public setBounds(val: any) {
    if (this.selectActions) {
      // TODO: Move over select and text editor when hitting the edge and covering library
      console.log(
        'Width is Less: ',
        +this.selectActions.offsetWidth > +val.left ||
          +this.selectActions.offsetWidth > +val.width
      );
    }

    this.bounds = {
      ...val,
    };
    this.editorService.selectedType.next('style')

  }
}
