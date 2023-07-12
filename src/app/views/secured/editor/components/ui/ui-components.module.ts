import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectBoxModule} from './select/select-box/select-box.module';
import {HighlightBoxModule} from './select/highlight-box/highlight-box.module';
import {GridSquareComponent} from './grid-square/grid-square.component';
import {ConfirmModule} from './confirm/confirm.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    GridSquareComponent
  ],
  imports: [
    CommonModule,
    SelectBoxModule,
    HighlightBoxModule,
    ConfirmModule,
    MatCardModule
  ],
  exports: [
    SelectBoxModule,
    HighlightBoxModule,
    MatCardModule,
    GridSquareComponent
  ],
  entryComponents: [
  ]
})
export class UiComponentsModule { }
