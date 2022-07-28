import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesCertComponent } from './companies-cert/companies-cert.component';

import { CompaniesFormComponent } from './companies-form/companies-form.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesViewComponent } from './companies-view/companies-view.component';

const routes: Routes = [
  { path: '', component: CompaniesListComponent },
  { path: 'new', component: CompaniesFormComponent },
  { path: 'view/:cpf_cnpj', component: CompaniesViewComponent },
  { path: 'edit/:cpf_cnpj', component: CompaniesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
