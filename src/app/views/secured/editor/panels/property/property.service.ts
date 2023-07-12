import { Injectable } from '@angular/core';
import {PropertiesModel} from './properties.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private selectedElement: HTMLElement;
  private styleDeclaration:any = {};
  selectedid:any


  public setElement(ele: HTMLElement) {
    this.selectedElement = ele;

    this.styleDeclaration = {};

    this.styleDeclaration = {
      ...this.getCssStyles(ele)
    };
  }

  public getCssStyles(element:any): PropertiesModel {
    console.log("here",element.id);
    this.selectedid=element.id
    return {
      ...window.getComputedStyle(element, null) || {}
    } as PropertiesModel;
  }

  public setStyle(element:any, styleProp:any, value:any) {
    console.log("changing here");
    
    return element.css(styleProp, value);
  }

 /*  public getStyle(element:any, styleProp:any): string {
    return this.styleDeclaration[styleProp];
  } */

  public getStyle(element: HTMLElement, styleProp: string): string {
    return this.styleDeclaration[styleProp];
  }


  constructor() { }
}
