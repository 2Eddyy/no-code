import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {PanelsModule} from './panels/panels.module';
import {EditorService} from './editor.service';
import {UiComponentsModule} from './components/ui/ui-components.module';
import {LibraryService} from './panels/library/library.service';
import {PipesModule} from './pipes/pipes.module';
import { LibraryModule } from './components/library/library.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateScreenModal } from './create-screen/create-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { IntegrationComponent } from './integration/integration.component';
import { ScreensListModel } from './screens-list/screens-list.component';
import { IntegrationService } from './integration/integration.service';
import { ScreensListPipe } from './screens-list/screens-list.pipe';
import { SearchPipe } from './screens-list/search-pipe.pipe';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
      EditorComponent,
      CreateScreenModal,
      IntegrationComponent,
      ScreensListModel,
      ScreensListPipe,
      SearchPipe
    ],
  imports: [
    NgbModule,
    UiComponentsModule,
    PanelsModule,
    LibraryModule,
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: [
    EditorService,
    LibraryService,
    EditorComponent,
    IntegrationComponent,
    IntegrationService
  ],
  schemas : [
    NO_ERRORS_SCHEMA, 
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EditorModule { }
