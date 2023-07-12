import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class EditorService {
  public highlightedElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dragElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dragElement_1: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);
public ScreenListSubject: Subject<any> = new Subject<any>();
public  setScreenData: Subject<any> = new Subject<any>();
public editSetValue:Subject<any>=new Subject<any>()


  isEditorRender = true
  boodskapService: any;
  public ScreenList: any;
  public app_id:any
  public integrationType: Subject<any> = new Subject<any>
  public selectedType = new BehaviorSubject<string>('style');
  public editValue:any
  public inputname:any
  constructor() {
    
  }

}
