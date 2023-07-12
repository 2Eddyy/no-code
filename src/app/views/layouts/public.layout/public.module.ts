import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicLayoutComponent } from "./public.layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";

const routes:Routes = [
    {
        path : "",
        component : PublicLayoutComponent
    }
];


@NgModule({
    declarations : [
        PublicLayoutComponent
    ],
    imports : [
        NgbModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forChild(routes)
    ],
    schemas: [
        NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class PublicLayoutModule {}