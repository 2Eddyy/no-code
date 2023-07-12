import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { EditorService } from '../../../editor.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  constructor(private editorSrv: EditorService) { }

  ngOnInit() {
  }

  public highlightElement(evt:any) {
    this.editorSrv.highlightedElement.next(evt);
  }

  public setActive(evt:any) {
    console.log('Sending Click');
  }

}
