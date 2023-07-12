import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DomainsComponent } from './domains.component';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
FormsModule
const routes: Routes = [
  {
    path: '',
    component: DomainsComponent
  }
];

@NgModule({
  declarations: [
    DomainsComponent,SearchPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,

  ]
})
export class DomainsModule { }
