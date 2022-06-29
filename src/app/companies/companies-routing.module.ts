import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteFormComponent } from './companies-form/cliente-form.component';
import { ClienteListComponent } from './companies-list/cliente-list.component';
import { ClienteViewComponent } from './companies-view/cliente-view.component';

const routes: Routes = [
  { path: '', component: ClienteListComponent },
  { path: 'new', component: ClienteFormComponent },
  { path: 'view/:cpf_cnpj', component: ClienteViewComponent },
  { path: 'edit/:cpf_cnpj', component: ClienteFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
