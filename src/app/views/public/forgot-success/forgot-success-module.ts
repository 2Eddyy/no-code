import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotSuccessComponent } from './forgot-success.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotSuccessComponent
  },
];


@NgModule({
  declarations: [
    ForgotSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers:[]
})
export class ForgotSuccessModule { }
