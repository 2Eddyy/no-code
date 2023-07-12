import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardEditorComponent } from "./dashboard-editor.component";
import { LayoutComponentComponent } from "../layout-component/layout-component.component";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from '@angular/cdk/drag-drop';


const routes:Routes = [
    {
        path : "",
        component : DashboardEditorComponent
    }
];

@NgModule({
    declarations : [
        DashboardEditorComponent,
        LayoutComponentComponent
    ],
    imports : [
        NgbModule,
        DragDropModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-top-center',
          preventDuplicates: true,
        }),
        RouterModule.forChild(routes)
    ],
    schemas : [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DashboardEditorModule { }


