import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmComponent} from './confirm.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class ConfirmModule { }
