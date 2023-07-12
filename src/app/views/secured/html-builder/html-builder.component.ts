import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-html-builder',
  templateUrl: './html-builder.component.html',
  styleUrls: ['./html-builder.component.scss']
})
export class HtmlBuilderComponent {
  orderableLists = [
    ['Item 1a', 'Item 2a', 'Item 3a'],
    ['Item 1b', 'Item 2b', 'Item 3b']
  ];

  nestedLists = [
    {
      label: 'Item 1',
      children: []
    },
    {
      label: 'Item 2',
      children: [
        {
          label: 'Item 2a',
          children: []
        },
        {
          label: 'Item 2b',
          children: []
        },
        {
          label: 'Item 2c',
          children: []
        }
      ]
    },
    {
      label: 'Item 3',
      children: [
        {
          label: 'Item 3a',
          children: []
        },
        {
          label: 'Item 3b',
          children: []
        },
        {
          label: 'Item 3c',
          children: []
        }
      ]
    }
  ];
}
