import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { ClienteFormComponent } from './companies-form/cliente-form.component';
import { ClienteListComponent } from './companies-list/cliente-list.component';
import { ClienteViewComponent } from './companies-view/cliente-view.component';

@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListComponent,
    ClienteViewComponent
  ],
  imports: [
    SharedModule,

    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
