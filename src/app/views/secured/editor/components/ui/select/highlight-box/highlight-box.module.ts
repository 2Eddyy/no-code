import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightBoxComponent} from './highlight-box.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HighlightBoxComponent
  ],
  exports: [
    HighlightBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HighlightBoxModule { }
