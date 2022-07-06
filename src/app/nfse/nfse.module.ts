import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { NfseRoutingModule } from './nfse-routing.module';
import { NfseFormComponent } from './nfse-form/nfse-form.component';
import { NfseListComponent } from './nfse-list/nfse-list.component';
import { NfseViewComponent } from './nfse-view/nfse-view.component';

@NgModule({
  declarations: [
    NfseFormComponent,
    NfseListComponent,
    NfseViewComponent
  ],
  imports: [
    SharedModule,
    NfseRoutingModule
  ]
})
export class NfSeModule { }
