import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GridRoutingModule } from './nfe-routing.module';
import { GridFormComponent } from './grid-form/grid-form.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { GridViewComponent } from './grid-view/grid-view.component';

@NgModule({
  declarations: [
    GridFormComponent,
    GridListComponent,
    GridViewComponent
  ],
  imports: [
    SharedModule,

    GridRoutingModule
  ]
})
export class NfeModule { }
