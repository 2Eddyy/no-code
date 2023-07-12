import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectController } from './project.controller';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatStepperModule} from '@angular/material/stepper';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Searcher } from './project-search-pipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: "",
    component: ProjectComponent
  },
  {
    path: "create-project",
    component: CreateProjectComponent
  }
];

@NgModule({
  declarations: [
    ProjectComponent,
    CreateProjectComponent,
    Searcher
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CommonModule,
    NgbTooltipModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    MatStepperModule
  ],
  providers: [
    ProjectController
  ],
  schemas : [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectModule { }
