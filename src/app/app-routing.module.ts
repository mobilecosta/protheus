import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cnpj',
    loadChildren: () => import('./cnpj/cnpj.module').then(m => m.CnpjModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'nfe',
    loadChildren: () => import('./nfe/nfe.module').then(m => m.NfeModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
