import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AuthInterceptor } from '../auth/auth-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NfseFormComponent } from './nfse-form/nfse-form.component';
import { NfseListComponent } from './nfse-list/nfse-list.component';
import { NfseViewComponent } from './nfse-view/nfse-view.component';

const routes: Routes = [
  { path: '', component: NfseListComponent },
  { path: 'new', component: NfseFormComponent },
  { path: 'view/:id', component: NfseViewComponent },
  { path: 'edit/:id', component: NfseFormComponent }
  // {
  //   path: 'edit/:id', component: NfseFormComponent, data: {
  //     serviceApi: 'http://localhost:3000/v1/people', // endpoint dos dados
  //     // serviceMetadataApi: 'http://localhost:3000/v1/metadata', // endpoint dos metadados utilizando o método HTTP Get
  //     serviceLoadApi: 'http://localhost:3000/load-metadata' // endpoint de customizações dos metadados utilizando o método HTTP Post
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class NfseRoutingModule { }
