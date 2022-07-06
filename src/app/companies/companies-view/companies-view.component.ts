import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './companies-view.component.html'
})
export class CompaniesViewComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.apinmockup + '/empresas';

  private clienteRemoveSub: Subscription;
  private clienteSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  empresa: any = {};

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private auth: AuthService) { }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    this.paramsSub = this.route.params.subscribe(params => this.loadData(params['cpf_cnpj'])
      );
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.clienteSub.unsubscribe();

    if (this.clienteRemoveSub) {
      this.clienteRemoveSub.unsubscribe();
    }
  }

  back() {
    this.router.navigateByUrl('companies');
  }
  // botão 
  edit() {
    this.router.navigateByUrl(`empresas/edit/${this.empresa.cpf_cnpj}`);
  }

  remove() {
    this.clienteRemoveSub = this.httpClient.delete(`${this.url}/${this.empresa.cpf_cnpj}`, { headers: this.headers })
      .subscribe(() => {
        this.poNotification.warning('Cadastro do cliente apagado com sucesso.');

        this.back();
      });
  }

  private loadData(cpf_cnpj) {
    this.clienteSub = this.httpClient.get(`${this.url}/${cpf_cnpj}`, { headers: this.headers })
      .subscribe(response => this.empresa = response
      );
      console.log("Resultado do log é: " + cpf_cnpj)

  }

}
