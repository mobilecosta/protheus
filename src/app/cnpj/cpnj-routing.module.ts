import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CnpjComponent } from './cnpj.component';

const cnpjRoutes: Routes = [
  {
    path:'',
    component: CnpjComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(cnpjRoutes)],
  exports: [RouterModule]
})

export class CnpjRoutingModule { }
