import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { PropertyComponent } from './property/property.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { ElementSearch } from './library/search.pipe';
import {FormsModule} from '@angular/forms';
import { UiComponentsModule } from '../components/ui/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    LibraryComponent,
    ElementSearch,
    PropertyComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    UiComponentsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatExpansionModule,
    MatSelectModule
  ],
  exports: [
    LibraryComponent,
    PropertyComponent,
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatExpansionModule
  ]
})
export class PanelsModule { }
