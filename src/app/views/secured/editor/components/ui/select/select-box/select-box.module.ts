import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBoxComponent } from './select-box.component';
import {SelectActionsComponent} from './select-actions/select-actions.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SelectActionsComponent,
    SelectBoxComponent
  ],
  exports: [
    SelectBoxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class SelectBoxModule { }
