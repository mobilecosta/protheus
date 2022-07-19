import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map, subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { AuthService } from 'src/app/auth/auth.service';
import { promise } from 'protractor';

const actionInsert = 'insert';
const actionUpdate = 'update';


interface Endereco {
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  codigo_municipio: string,
  cidade: string,
  uf: string,
  codigo_pais: string,
  pais: string,
  cep: string
}

interface Empresa {
 
  cpf_cnpj: string,
  inscricao_estadual: string,
  inscricao_municipal: string,
  nome_razao_social: string,
  nome_fantasia: string,
  fone: string,
  email: string,
  status: string,

  endereco: Endereco
}



@Component({
  selector: 'app-cliente-form',
  templateUrl: './companies-form.component.html'
})
export class CompaniesFormComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.apiNS + '/empresas';

  private action: string = actionInsert;
  private empresaSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;


  empresa: any = {};
  endereco: Endereco = {} as Endereco;
  statusRes: string = "";
  continue: boolean;


  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService) { }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.empresaSub) {
      this.empresaSub.unsubscribe();
    }
  }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
     this.paramsSub = this.route.params.subscribe(params => {
      if (params['cpf_cnpj']) {
        this.loadData(params['cpf_cnpj']);
        this.action = actionUpdate;
      }
    });
  }

  private onNewCliente() {
    this.router.navigateByUrl('companies/new');
  }

  cancel() {
    this.router.navigateByUrl('/companies');
  }

  async save() {
    const empresa = { ...this.empresa };
      let body = 
        {
          // campos obrigatório."
          "cpf_cnpj": `${empresa.cpf_cnpj}`,
          "nome_razao_social": `${empresa.nome_razao_social}`,
          "nome_fantasia": `${empresa.nome_fantasia}`,
          "email": `${empresa.email}`,
          "inscricao_municipal": `${empresa.inscricao_municipal}`,
          "endereco": {
                      "logradouro": `${this.endereco.logradouro}`,
                      "numero": `${this.endereco.numero}`,
                      "bairro": `${this.endereco.bairro}`,
                      "cidade": `${this.endereco.cidade}`,
                      "codigo_municipio": `${this.endereco.codigo_municipio}`,
                      "uf": `${this.endereco.uf}`,
                      "cep": `${this.endereco.cep}`,
          },

      }
        this.empresaSub = this.isUpdateOperation        
      ? this.httpClient.patch(`${this.url}/${empresa.cpf_cnpj}`, body, {headers: this.headers})
        .subscribe(() => this.navigateToList('Empresa atualizada com sucesso'))
        : this.httpClient.post(`${this.url}`, body,  {headers: this.headers})
        .subscribe(() => this.navigateToList('Empresa cadastrada com sucesso'))
       
  }

  get isUpdateOperation() {
    return this.action === actionUpdate
  }

  get cpf_cnpj() {
    return this.isUpdateOperation ? 'Atualizando empresa' : 'Nova empresa';
  }

  private loadData(cpf_cnpj: string) {
    this.empresaSub = this.httpClient.get(`${this.url}/${cpf_cnpj}`, { headers: this.headers })
    .subscribe((response: Empresa) => {
      this.empresa = response;
      this.endereco = response.endereco;
      
  }); 
  
  }
  
  private navigateToList(msg: string) {
    this.poNotification.success(msg);
    this.continue = confirm("Deseja cadastrar outra empresa?")
    this.continue === true ? window.location.reload() : this.cancel()
  }

}
