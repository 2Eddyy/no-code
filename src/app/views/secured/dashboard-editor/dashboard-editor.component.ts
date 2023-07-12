import { OnInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { CommonDataService } from 'src/app/services/commondata.service';
import { DndDropEvent, EffectAllowed, DndDragImageOffsetFunction, DropEffect } from "ngx-drag-drop";

@Component({
  selector: 'app-dashboard-editor',
  templateUrl: './dashboard-editor.component.html',
  styleUrls: ['./dashboard-editor.component.scss']
})
export class DashboardEditorComponent implements OnInit{

  userObj:any;
  user_subject:any;
  draggedItems:any;
  layoutList:any;
  isClicked:any;
  isUIView:boolean = true;
  basiceElementList: any = [
    {
      name: 'Heading',
      img: 'heading.png'
    },
    {
      name: 'Text Editor',
      img: 'text-editor.png '
    },
    {
      name: 'Button',
      img: 'button.png'
    },
    {
      name: 'Icon',
      img: 'icons.png'
    },
    {
      name: 'Image',
      img: 'image.png'
    },
    {
      name: 'Video',
      img: 'video.png'
    },
    {
      name: 'Label',
      img: 'label.png'
    },
    {
      name: 'Input',
      img: 'input.png'
    },
    {
      name: 'Search',
      img: 'search.png'
    },
    {
      name: 'List',
      img: 'list.png'
    },
    {
      name: 'Toggle Button',
      img: 'toggle-button.png'
    },
    {
      name: 'Dropdown',
      img: 'dropdown.png'
    },
    {
      name: 'Datepicker',
      img: 'datepicker.png'
    },
    {
      name: 'Countdown',
      img: 'countdown.png'
    },
    {
      name: 'Map',
      img: 'map.png'
    },
    {
      name: 'Space Divider',
      img: 'space-divider.png'
    },
    {
      name: 'Table',
      img: 'table.png'
    },
    {
      name: 'Check Box',
      img: 'checkbox.png'
    },
   
  ];

  // @ViewChild('appScreenHtml', { static: true }) containerRef: ElementRef;
  @ViewChild('appScreenHtml') containerRef: ElementRef

  constructor(
    private commonDataService : CommonDataService,
    private renderer: Renderer2
  ){}

  createScreen(){
    
  }

  convertJSONToHTML(json: any): HTMLElement {
    const element = document.createElement(json.tag);
  
    // Add attributes
    if (json.attributes) {
      for (const key in json.attributes) {
        if (json.attributes.hasOwnProperty(key)) {
          element.setAttribute(key, json.attributes[key]);
        }
      }
    }
  
    // Add styles
    if (json.styles) {
      for (const key in json.styles) {
        if (json.styles.hasOwnProperty(key)) {
          element.style[key] = json.styles[key];
        }
      }
    }
  
    // Add children
    if (json.children) {
      for (const child of json.children) {
        const childElement = this.convertJSONToHTML(child);
        element.appendChild(childElement);
      }
    }

    console.log(element)
  
    return element;
  }
  
  

  convertHtmlToJSON(element: any) {
    // Handle special cases
    if (element instanceof Comment) {
      return null;
    }

    if (element instanceof DocumentType) {
      return {
        tag: 'doctype',
        attributes: {},
        styles: {},
        children: []
      };
    }

    // Handle regular elements
    const tag = element.tagName.toLowerCase();
    const attributes:any = {};
    const styles:any = {};

    // Get attributes
    for (let i = 0; i < element.attributes.length; i++) {
      const attribute = element.attributes.item(i);
      const name:any = attribute?.name.toLowerCase();

      if (name.startsWith('on')) {
        // Handle event handlers
        const eventName:any = name.substr(2);
        attributes[eventName] = attribute.value;
      } else if (name.startsWith('data-')) {
        // Handle data attributes
        const dataName = name.substr(5);
        attributes[dataName] = attribute.value;
      } else {
        attributes[name] = attribute.value;
      }
    }

    // Get styles
    const style = element.getAttribute('style');
    if (style) {
      style.split(';').forEach((styleDef:any) => {
        const [key, value] = styleDef.split(':');
        styles[key.trim()] = value.trim();
      });
    }

    // Recursively convert child elements
    const children = [];
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children.item(i);
      const childJSON:any = this.convertHtmlToJSON(child);
      if (childJSON !== null) {
        children.push(childJSON);
      }
    }

    return {
      tag,
      attributes,
      styles,
      children
    };
  }

  ngAfterViewInit(): void {
    console.log(this.containerRef);
  }

  async getHtmlDoms(){

    /* console.log(this.containerRef)
    
    const container = this.containerRef.nativeElement;
    const html = this.convertHtmlToJSON(container);
    console.log(JSON.stringify(html)); */

    let html = {"tag":"div","attributes":{"_ngcontent-yro-c30":"","class":"editor-container p-3 mx-5 my-dropzone d-flex justify-content-center"},"styles":{},"children":[{"tag":"div","attributes":{"_ngcontent-yro-c30":"","class":"bg-white"},"styles":{},"children":[{"tag":"h1","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]},{"tag":"h2","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]},{"tag":"h3","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]},{"tag":"h4","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]},{"tag":"h5","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]},{"tag":"h6","attributes":{"_ngcontent-yro-c30":""},"styles":{},"children":[]}]},{"tag":"div","attributes":{"_ngcontent-yro-c30":"","class":"w-100"},"styles":{},"children":[]}]};
    /* let res = await this.convertJSONToHTML(html);
    console.log("convertJSONToHTML-----------");
    console.log(res);
    this.containerRef.nativeElement.innerHTML = res; */

    const htmlString = this.convertJSONToHTML(html);
    let tempDiv:any = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    this.containerRef.nativeElement.innerHTML = '';
    this.containerRef.nativeElement.appendChild(tempDiv);

    console.log("convertJSONToHTML-----------tempDiv");
    console.log(tempDiv);
  }

  ngOnInit(): void {
    this.user_subject = this.commonDataService.user$.subscribe((values)=>{
      this.userObj = values;
    });
  }
}
