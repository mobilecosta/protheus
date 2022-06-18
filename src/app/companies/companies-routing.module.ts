import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';


const companiesRoutes: Routes = [
  {
    path: '',
    component: CompaniesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(companiesRoutes)],
  exports: [RouterModule]
})

export class CnpjRoutingModule { }
