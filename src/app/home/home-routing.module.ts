import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CnpjComponent } from '../cnpj/cnpj.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: HomeDashboardComponent },


      {
        path: 'users',
        loadChildren: () => import('../grid/grid.module').then(m => m.GridModule)
      },

      {
        path: 'companies',
        loadChildren: () => import('../companies/companies.module').then(m => m.CompaniesModule)
      },
      {
        path: 'nfe',
        loadChildren: () => import('../nfe/nfe.module').then(m => m.NfeModule)
      },
      {
        path: 'nfse',
        loadChildren: () => import('../nfse/nfse.module').then(m => m.NfSeModule)
      },
      {
        path: 'cnpj',
        loadChildren: () => import('../cnpj/cnpj.module').then(m => m.CnpjModule)
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
