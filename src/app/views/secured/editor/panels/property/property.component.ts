import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { EditorService } from '../../editor.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PropertyService } from './property.service';
import { PropertiesModel } from './properties.model';
import { style } from '@angular/animations';
import 'ace-builds/src-noconflict/ace.js';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

declare let ace: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit, OnDestroy {
  @Output() propertyUpdated: EventEmitter<boolean> =
    new EventEmitter<boolean>();

    @ViewChild('editor') editorRef: ElementRef;

    ngOnchange() {
      if(this.selectedType){
        const editor = ace.edit(this.editorRef.nativeElement);
        editor.setTheme('ace/theme/github');
        editor.session.setMode('ace/mode/javascript');
      }
    }
    
  public display = 'block';
  public styles: PropertiesModel = {};
  public iFrameEle: HTMLIFrameElement;
  public selectedElement: any;
  public backgroundColor: any;
  public textColor: any;
  public borderColor: any;
  public loadedImgName = 'None';
  public backgroundImgName = 'None';
  public currentEleTag = '';
  prop: any = 'styles';
  public size = {
    width: {
      val: 0,
      unit: 'px',
    },
    minWidth: {
      val: 0,
      unit: 'px',
    },
    maxWidth: {
      val: 0,
      unit: 'px',
    },
    height: {
      val: 0,
      unit: 'px',
    },
    minHeight: {
      val: 0,
      unit: 'px',
    },
    maxHeight: {
      val: 0,
      unit: 'px',
    },
  };
  public position = {
    top: {
      val: 0,
      unit: 'px',
    },
    left: {
      val: 0,
      unit: 'px',
    },
    bottom: {
      val: 0,
      unit: 'px',
    },
    right: {
      val: 0,
      unit: 'px',
    },
  };
  public margin = {
    marginTop: {
      val: 0,
      unit: 'px',
    },
    marginRight: {
      val: 0,
      unit: 'px',
    },
    marginBottom: {
      val: 0,
      unit: 'px',
    },
    marginLeft: {
      val: 0,
      unit: 'px',
    },
  };
  public padding = {
    paddingTop: {
      val: 0,
      unit: 'px',
    },
    paddingRight: {
      val: 0,
      unit: 'px',
    },
    paddingBottom: {
      val: 0,
      unit: 'px',
    },
    paddingLeft: {
      val: 0,
      unit: 'px',
    },
  };
  public border = {
    borderWidth: {
      val: 0,
      unit: 'px',
    },
    borderBottom: {
      val: 0,
      unit: 'px',
    },
    borderBottomLeftRadius: {
      val: 0,
      unit: 'px',
    },
    borderBottomRightRadius: {
      val: 0,
      unit: 'px',
    },
    borderBottomWidth: {
      val: 0,
      unit: 'px',
    },
    borderTop: {
      val: 0,
      unit: 'px',
    },
    borderTopLeftRadius: {
      val: 0,
      unit: 'px',
    },
    borderTopRightRadius: {
      val: 0,
      unit: 'px',
    },
    borderTopWidth: {
      val: 0,
      unit: 'px',
    },
    borderRightWidth: {
      val: 0,
      unit: 'px',
    },
    borderLeftWidth: {
      val: 0,
      unit: 'px',
    },
  };
  public typography = {
    fontSize: {
      val: 0,
      unit: 'px',
    },
    lineHeight: {
      val: 0,
      unit: 'px',
    },
    letterSpacing: {
      val: 0,
      unit: 'px',
    },
  };
  public iframeSrcUpdate = new Subject<string>();
  public selectedType:any
  eventsList = [
    {value: 'Page variable changed', viewValue: 'Page variable changed'},
    {value: 'App variable name changed', viewValue: 'App variable name changed  '},
    {value: 'Component tab', viewValue: 'Component tab'},
  ];
  @Input() set element(ele: HTMLElement) {
    this.loadedImgName = 'None';
    this.backgroundImgName = 'None';
    if (ele) {
      this.selectedElement = ele;
      this.currentEleTag = this.selectedElement.tagName.toLowerCase();
      this.styles = this.propertySrv.getCssStyles(this.selectedElement);
      this.textColor = this.fullColorHex(this.selectedElement.style.color);
      this.backgroundColor = this.fullColorHex(
        this.selectedElement.style.backgroundColor
      );
      this.borderColor = this.fullColorHex(
        this.selectedElement.style.borderColor
      );
      //
      this.size = this.buildPropObj(
        Object.keys(this.size),
        this.selectedElement.style,
        this.styles
      );
      //
      this.margin = this.buildPropObj(
        Object.keys(this.margin),
        this.selectedElement.style,
        this.styles
      );
      //
      this.padding = this.buildPropObj(
        Object.keys(this.padding),
        this.selectedElement.style,
        this.styles
      );
      //
      this.position = this.buildPropObj(
        Object.keys(this.position),
        this.selectedElement.style,
        this.styles
      );
      //
      this.border = this.buildPropObj(
        Object.keys(this.border),
        this.selectedElement.style,
        this.styles
      );
      //
      this.typography = this.buildPropObj(
        Object.keys(this.typography),
        this.selectedElement.style,
        this.styles
      );
      //
      if (this.selectedElement.tagName.toLowerCase() === 'img') {
        this.loadedImgName =
          this.selectedElement.getAttribute('name') || 'None';
      } else {
        this.backgroundImgName =
          this.selectedElement.getAttribute('name') || 'None';
      }
      //
      if (this.selectedElement.tagName.toLowerCase() === 'iframe') {
        this.iFrameEle = ele as HTMLIFrameElement;
      }
      this.propertyUpdated.emit(true);
    }
  }

  constructor(
    private propertySrv: PropertyService,
    private editorSrv: EditorService
  ) {}

  ngOnInit(): void {
    this.iframeSrcUpdate
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value) => {
        this.updateProperty('src', value);
      });
      this.editorSrv.selectedType.subscribe(x =>{
        this.selectedType = x
      })
      this.editorSrv.integrationType.subscribe(x =>{
        console.log(x)
      })
  }

  ngOnDestroy(): void {
    console.log('property id', this.propertySrv.selectedid);
  }
  createVariable(varName: any, varContent: any) {
    var scriptStr = 'var ' + varName + '= "' + varContent + '"';
    console.log(scriptStr);
    var node_scriptCode = document.createTextNode(scriptStr);
    // console.log(node_scriptCode.data);
    var node_script = document.createElement('script');
    node_script.type = 'text/javascript';
    node_script.appendChild(node_scriptCode);
    // console.log(node_script);
    var node_head = document.getElementsByTagName('head')[0];
    node_head.appendChild(node_script);
    // console.log(node_head)
  }
  // id:any
  id = this.propertySrv.selectedid;
  // id=value
  setname(ev: any) {
    console.log('id of the input', this.id);

    let a =
      'var ' +
      ev.target.value +
      ' = ' +
      (document.getElementById(this.id) as any).value;

    // console.log('A value', a);

    // console.log(val.id);
    // console.log('event', ev.target.value);
  }
  private checkCaseForProp(prop: string): string {
    const styleKeys: string[] = [
      ...Object.keys(this.size),
      ...Object.keys(this.position),
      ...Object.keys(this.margin),
      ...Object.keys(this.padding),
      ...Object.keys(this.border),
      ...Object.keys(this.typography),
    ];

    const hasProp = styleKeys.includes(prop);

    return hasProp === true ? prop : '';
  }

  public updateProperty(prop: string, val: string, obj: any = this.size) {
    // console.log('setting styles here');

    switch (prop) {
      case this.checkCaseForProp(prop):
        if (val === '0') {
          this.selectedElement.style[prop] = '';
          break;
        }
        this.selectedElement.style[prop] = `${obj[prop].val}${obj[prop].unit}`;
        break;
      case 'src':
        this.selectedElement[prop] = val;
        break;
      default:
        this.selectedElement.style[prop] = val;
    }
    this.propertyUpdated.emit(true);
    console.log(prop, this.selectedElement.style[prop]);
  }

  private updateAttribute(prop: string, val: string) {
    this.selectedElement.setAttribute(prop, val);
    this.propertyUpdated.emit(true);
  }

  public availableOnSelectedEle(tag: string): boolean {
    switch (tag.toLowerCase()) {
      case 'iframe':
      case 'img':
      case 'video':
        return false;
      default:
        return true;
    }
  }

  public imageToBase64URL(evt: any) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (data) => {
      const fr: FileReader = data.currentTarget as FileReader;
      if (this.selectedElement.tagName.toLowerCase() === 'img') {
        this.loadedImgName = evt.target.value;
        const img: HTMLImageElement = this.selectedElement as HTMLImageElement;
        img.src = `${fr.result}`;
      } else {
        this.backgroundImgName = evt.target.value;
        this.updateProperty('backgroundImage', `url(${fr.result})`);
      }
      this.updateAttribute('name', evt.target.value);
      evt.target.value = '';
    };
    fileReader.readAsDataURL(evt.target.files[0]);
  }

  public removeLoadedImg() {
    const img: HTMLImageElement = this.selectedElement as HTMLImageElement;
    img.src = `//placehold.it/${img.width}x${img.height}/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder`;
    this.loadedImgName = 'None';
  }

  public removeBgImage() {
    this.updateProperty('backgroundImage', 'none');
    this.updateAttribute('name', 'None');
    this.backgroundImgName = 'None';
  }

  // private buildPropObj(props: string[], inlineStyles:any, generatedStyles: PropertiesModel): any {
  private buildPropObj(
    props: string[],
    inlineStyles: any,
    generatedStyles: any
  ): any {
    let keysObj: any = {};
    props.forEach((key) => {
      let styleType: any = null;
      if (inlineStyles[key].length > 0) {
        styleType = inlineStyles[key];
      } else {
        styleType = generatedStyles[key];
      }
      keysObj[key] = this.spitNumFromUnit(styleType);
    });
    return keysObj;
  }

  private spitNumFromUnit(numWithUnit: string) {
    let props = {
      val: '',
      unit: 'px',
    };
    ['auto', 'px', 'em', '%', 'rem'].forEach((unit) => {
      if (numWithUnit.indexOf(unit) !== -1) {
        props = {
          val: numWithUnit.substring(0, numWithUnit.indexOf(unit)),
          unit,
        };
      }
    });

    return props;
  }

  private fullColorHex(rgb: any) {
    if (!rgb || rgb === 'initial' || rgb.length < 1) {
      return;
    }
    const values = rgb.split('(')[1].split(')')[0].split(',');
    const red = this.rgbToHex(values[0]);
    const green = this.rgbToHex(values[1]);
    const blue = this.rgbToHex(values[2]);

    const hex = `#${red}${green}${blue}`;
    return hex === '' ? '#000000' : hex;
  }

  private rgbToHex(rgb: any): string {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  }

  private camelToSnake(str: string) {
    str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  private snakeToCamel(s: any) {
    return s.replace(/(\-\w)/g, (m: any) => m[1].toUpperCase());
  }
}
