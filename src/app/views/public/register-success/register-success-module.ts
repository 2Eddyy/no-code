import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterSuccessComponent } from './register-success.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterSuccessComponent
    }
];

@NgModule({
    declarations: [
        RegisterSuccessComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class RegisterSuccessModule { }
