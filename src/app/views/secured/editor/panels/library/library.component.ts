import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../editor.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public componentList: any[] = [
    {
      type: 'basic',
      id: 'page',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/page.png',
      label: 'Page',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'container',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/container-1.png',
      label: 'Container',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'iframe',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/iframe.png',
      label: 'iFrame',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'row2column',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/row.png',
      label: 'Row 2 Columns',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'row3column',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/3columns.png',
      label: 'Row 3 Columns',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'horizontal_rule',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/hzrule.png',
      label: 'Horizontal Rule',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'text',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/paragraph.png',
      label: 'Paragraph',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'textRight',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/imgLeft.png',
      label: 'Text Right',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'textLeft',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/imgRight.png',
      label: 'Text Left',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'jumbotron',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/jumbotron.png',
      label: 'Jumbotron',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'info_card',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card.png',
      label: 'Info Card',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'price_card',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card.png',
      label: 'Price Card',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'feature_card',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card_feature.png',
      label: 'Feature Card',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'text_input',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/input.png',
      label: 'Text Input',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'card_group',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card_group.png',
      label: 'Card Group',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'card_deck',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card_deck.png',
      label: 'Card Deck',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'profile_card',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/card_profile.png',
      label: 'Profile Card',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'button',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/button.png',
      label: 'Button',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'video',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/video.png',
      label: 'Video',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'video_with_text',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/video.png',
      label: 'Video With Text',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'img',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/image.png',
      label: 'Image',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'imgGrid',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/imgGrid.png',
      label: 'Image Grid',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'carousel',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/slideshow.png',
      label: 'Carousel',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'checkbox',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/CheckBox.png',
      label: 'Check Box',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    {
      type: 'basic',
      id: 'radiobutton',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/RadioButton.png',
      label: 'Radio Button',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    // {
    //   type: 'basic',
    //   id: 'togglebutton',
    //   backgroundType: '',
    //   colspan: 1,
    //   image: '',
    //   icon: './assets/icons/ToggleButton.png' ,
    //   label: 'Toggle Button',
    //   url: '',
    //   key: '',
    //   action: '',
    //   disabled: false,
    //   category: '',
    // },
    {
      type: 'basic',
      id: 'dropdown',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/Dropdown.png',
      label: 'Dropdown Box',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    // {
    //   type: 'basic',
    //   id: 'datetime',
    //   backgroundType: '',
    //   colspan: 1,
    //   image: '',
    //   icon: './assets/icons/Datepicker.png',
    //   label: 'Date Picker',
    //   url: '',
    //   key: '',
    //   action: '',
    //   disabled: false,
    //   category: '',
    // },
    {
      type: 'basic',
      id: 'loading',
      backgroundType: '',
      colspan: 1,
      image: '',
      icon: './assets/icons/Loading.png',
      label: 'Loading',
      url: '',
      key: '',
      action: '',
      disabled: false,
      category: '',
    },
    // {
    //   type: 'basic',
    //   id: 'icon',
    //   backgroundType: '',
    //   colspan: 1,
    //   image: '',
    //   icon: './assets/icons/Icon.png',
    //   label: 'Switch',
    //   url: '',
    //   key: '',
    //   action: '',
    //   disabled: false,
    //   category: '',
    // },



    // {
    //   name: 'Switch',
    //   img: 'checkbox.png'
    // }
  ]
  elesearch: any
  constructor(private editorSrv: EditorService) { }
  ngOnInit() {
  }
  public dragStartHandler(item: { id: string, icon: string }) {

    this.editorSrv.dragElement_1.subscribe({
      next:(res:any)=>{
        console.log(res.children[0].attributes[4]);        
      }
    })

    this.editorSrv.dragElement.next(item)
  }
  public dragStopHandler(item: { id: string, icon: string }) {
    this.editorSrv.dragElement.next({ id: '', icon: '' })
  }


}
