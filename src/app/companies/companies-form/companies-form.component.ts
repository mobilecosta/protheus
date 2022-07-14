import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { AuthService } from 'src/app/auth/auth.service';

const actionInsert = 'insert';
const actionUpdate = 'update';


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

  public empresas: any = {};

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


        // console.log(this.headers)



      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/companies');
  }

  save() {
    const empresa = { ...this.empresas };
    

      let body = 
        {
          // campos obrigatório."
          "cpf_cnpj": `${empresa.cpf_cnpj}`,
          "nome_razao_social": `${empresa.nome_razao_social}`,
          "nome_fantasia": `${empresa.nome_fantasia}`,
          "email": `${empresa.email}`,
          "logradouro": `${empresa.logradouro}`,
          "numero": `${empresa.numero}`,
          "bairro": `${empresa.bairro}`,
          "uf": `${empresa.uf}`,
          "cep": `${empresa.cep}`,
      }
    // const empresa = { ...this.empresas };
    
         console.log(empresa.cpf_cnpj ); 
        this.empresaSub = this.isUpdateOperation
        
      ? this.httpClient.patch(`${this.url}/${empresa.cpf_cnpj}`, body, {headers: this.headers})
        .subscribe(() => this.navigateToList('Cliente atualizado com sucesso'))
      : this.httpClient.post(`${this.url}`, body,  {headers: this.headers})
        .subscribe(() => this.navigateToList('Cliente cadastrado com sucesso'));

        //logs
        // console.log("---log de put:" + this.url + "/" + empresa.cpf_cnpj);
        // console.log("---log de post:" + this.url);
        // console.log(this.headers );
        
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get cpf_cnpj() {
    return this.isUpdateOperation ? 'Atualizando empresas' : 'Nova empresa';
  }

  private loadData(cpf_cnpj: any) {
    this.empresaSub = this.httpClient.get(`${this.url}/${cpf_cnpj}`, { headers: this.headers })
        
      .subscribe(response => this.empresas = response);
      
  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/new');
  }

}
