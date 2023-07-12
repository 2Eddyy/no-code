import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { LeftmenuComponent } from "./leftmenu/leftmenu.component";
import { SecuredHeader } from "./header/secured-header.component";
import { SecuredLayoutComponent } from "./secured.layout.component";

const routes:Routes = [
    {
        path : "",
        component : SecuredLayoutComponent
    }
];

@NgModule({
    declarations : [
        SecuredHeader,
        SecuredLayoutComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        NgbModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SecuredLayoutModule {}