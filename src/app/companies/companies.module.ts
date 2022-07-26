import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesFormComponent } from './companies-form/companies-form.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesViewComponent } from './companies-view/companies-view.component';

@NgModule({
  declarations: [
    CompaniesFormComponent,
    CompaniesListComponent,
    CompaniesViewComponent,
  ],
  imports: [SharedModule, CompaniesRoutingModule],
})
export class CompaniesModule {}
