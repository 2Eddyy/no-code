import {Component, Input, OnInit} from '@angular/core';

// export const exec = (command:any, value = null) => document.execCommand(command, false, value);
export const exec = (command: string, value?: string | undefined) => document.execCommand(command, false, value);


@Component({
  selector: 'app-select-actions',
  templateUrl: './select-actions.component.html',
  styleUrls: ['./select-actions.component.scss']
})

export class SelectActionsComponent implements OnInit {
  @Input() element: Element;

  public txtEditorActions = {
    heading1: {
      icon: '<b>H<sub>1</sub></b>',
      title: 'Heading 1',
      result: () => exec(this.formatBlock, '<h1>')
    },
    heading2: {
      icon: '<b>H<sub>2</sub></b>',
      title: 'Heading 2',
      result: () => exec(this.formatBlock, '<h2>')
    },
    link: {
      icon: '&#128279;',
      title: 'Link',
      result: () => {
        const url = window.prompt('Enter the link URL');
        if (url) { exec('createLink', url); }
      }
    },
    image: {
      icon: '&#128247;',
      title: 'Image',
      result: () => {
        const url = window.prompt('Enter the image URL');
        if (url) { exec('insertImage', url); }
      }
    }
  };

  private formatBlock = 'formatBlock';

  constructor() { }

  ngOnInit() {
  }

  public dragItem(evt:any) {
    console.log('Event: ', evt);
  }

  public executeCommand(cmd: string) {
    console.log('executeCommand: ', cmd);
    // const state = document.queryCommandState(cmd);
    exec(cmd);
    const selectedELe = this.element as HTMLElement;
    selectedELe.focus();
  }

  public removeElement(): void {
    document.getElementById(this.element.id)?.remove();
    const selectBox = document.getElementById('select_box');
    if (selectBox) {
      selectBox.style.display = 'none';
    }
  }
}
