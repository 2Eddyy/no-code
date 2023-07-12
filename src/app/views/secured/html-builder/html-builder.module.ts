import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HtmlBuilderComponent } from './html-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

const routes: Routes = [
  {
    path: '',
    component: HtmlBuilderComponent
  }
];

@NgModule({
  declarations: [
    HtmlBuilderComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NgxDnDModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class HtmlBuilderModule { }
