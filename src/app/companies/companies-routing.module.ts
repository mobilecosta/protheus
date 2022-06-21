import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AuthInterceptor } from '../auth/auth-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { GridFormComponent } from './grid-form/grid-form.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { GridViewComponent } from './grid-view/grid-view.component';

const routes: Routes = [
  { path: '', component: GridListComponent },
  { path: 'new', component: GridFormComponent },
  { path: 'view/:id', component: GridViewComponent },
  { path: 'edit/:id', component: GridFormComponent }
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
export class CompaniesRoutingModule { }
