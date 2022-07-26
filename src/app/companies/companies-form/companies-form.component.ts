import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map, subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption, PoTableBoolean } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { AuthService } from 'src/app/auth/auth.service';
import { promise } from 'protractor';

const actionInsert = 'insert';
const actionUpdate = 'update';

interface Rps {
  lote: number,
  serie: string,
  numero: number
}

interface Nfse {

  ambiente: ["homologacao", "producao"],
  rps: Rps
}

interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  codigo_municipio: string;
  cidade: string;
  uf: string;
  codigo_pais: string;
  pais: string;
  cep: string;
}

interface Empresa {
  cpf_cnpj: string;
  inscricao_estadual: string;
  inscricao_municipal: string;
  nome_razao_social: string;
  nome_fantasia: string;
  fone: string;
  email: string;
  status: string;

  endereco: Endereco;

  nfse: Nfse
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './companies-form.component.html',
})
export class CompaniesFormComponent implements OnDestroy, OnInit {
  private readonly url: string = environment.apiNS + '/empresas';


  optante_simples_nacional: boolean = false;
  regime_tributacao: number;
  regime_especial_tributacao: number;
  incentivo_fiscal: boolean = false;
  incentivador_cultural: boolean = false;
  filterParams = {}

  readonly regimeTributacao: Array<PoSelectOption> = [
    { label: '1 - Simples Nacional', value: 1 },
    { label: '2 - Simples Nacional - Excesso de Sub Limite de Receita Bruta', value: 2, },
    { label: '3 - Regime Normal', value: 3 },
  ];

  readonly regimeEspecialTributacao: Array<PoSelectOption> = [
    { label: '0 - Nenhum', value: 0 },
    { label: '1 - Microempresa Municipal', value: 1 },
    { label: '2 - Estimativa', value: 2 },
    { label: '3 - Sociedade de Profissionais', value: 3 },
    { label: '4 - Cooperativa', value: 4 },
    { label: '5 - MEI', value: 5 },
    { label: '6 - ME / a', value: 6 },
  ]
  readonly nfseAmbiente: Array<PoSelectOption> = [
    { label: "Homologação", value: 1 },
    { label: "Produção", value: 2 }
  ]

  onChangeIncentivoFiscal(incentivo_fiscal: boolean) {
    this.filterParams = true ? { incentivo_fiscal: false } : {};
    this.incentivo_fiscal = false;
    console.log(incentivo_fiscal);

  }

  onChangeOptanteSimplesNacional(optante_simples_nacional: boolean) {
    this.filterParams = true ? { optante_simples_nacional: false } : {};
    this.optante_simples_nacional = false;
    console.log(optante_simples_nacional);

  }

  onChangeIcentivadorCultural(incentivador_cultural: boolean) {
    this.filterParams = true ? { incentivador_cultural: false } : {};
    this.incentivador_cultural = false;
    console.log(incentivador_cultural);

  }

  private action: string = actionInsert;
  private empresaSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  empresa: any = {};
  endereco: Endereco = {} as Endereco;
  nfse: Nfse = {} as Nfse
  statusRes: string = '';
  continue: boolean;

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService
  ) { }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.empresaSub) {
      this.empresaSub.unsubscribe();
    }
  }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' +
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI'
    );
    this.paramsSub = this.route.params.subscribe((params) => {
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
    let body = {
      // campos obrigatório."
      cpf_cnpj: `${empresa.cpf_cnpj}`,
      nome_razao_social: `${empresa.nome_razao_social}`,
      nome_fantasia: `${empresa.nome_fantasia}`,
      email: `${empresa.email}`,
      inscricao_municipal: `${empresa.inscricao_municipal}`,
      endereco: {
        logradouro: `${this.endereco.logradouro}`,
        numero: `${this.endereco.numero}`,
        bairro: `${this.endereco.bairro}`,
        cidade: `${this.endereco.cidade}`,
        codigo_municipio: `${this.endereco.codigo_municipio}`,
        uf: `${this.endereco.uf}`,
        cep: `${this.endereco.cep}`,
      },
      optante_simples_nacional: `${this.empresa.optante_simples_nacional}`,
      regime_tributacao: `${this.empresa.regime_tributacao}`,
      regime_especial_tributacao: `${this.empresa.regime_especial_tributacao}`,
      incentivo_fiscal: `${this.empresa.incentivo_fiscal}`,
      incentivador_cultural: `${this.empresa.incentivador_cultural}`,

      nfe: {
        ambiente: `${this.empresa.nfe.ambiente}`,
      },
      mdfe: {
        ambiente: `${this.empresa.mdfe.ambiente}`
      },
      cte: {
        ambiente: `${this.empresa.cte.ambiente}`
      },
      cte_os: {
        ambiente: `${this.empresa.cte_os.ambiente}`
      },
      nfse: {
        rps: {
          lote: `${this.empresa.nfse.rps.lote}`,
          serie: `${this.empresa.nfse.rps.serie}`,
          numero: `${this.empresa.nfse.rps.numero}`
        },
        prefeitura: {
          login: `${this.empresa.nfse.prefeitura.login}`,
          senha: `${this.empresa.nfse.prefeitura.senha}`,
          token: `${this.empresa.nfse.prefeitura.token}`
        },
        ambiente: `${this.empresa.nfse.ambiente}`,
      }
    }

    this.empresaSub = this.isUpdateOperation
      ? this.httpClient
        .patch(`${this.url}/${empresa.cpf_cnpj}`, body, {
          headers: this.headers,
        })
        .subscribe(() =>
          this.navigateToList('Empresa atualizada com sucesso')
        )
      : this.httpClient
        .post(`${this.url}`, body, { headers: this.headers })
        .subscribe(() =>
          this.navigateToList('Empresa cadastrada com sucesso')
        );
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get cpf_cnpj() {
    return this.isUpdateOperation ? 'Atualizando empresa' : 'Nova empresa';
  }

  private loadData(cpf_cnpj: string) {
    this.empresaSub = this.httpClient
      .get(`${this.url}/${cpf_cnpj}`, { headers: this.headers })
      .subscribe((response: Empresa) => {
        this.empresa = response;
        this.endereco = response.endereco;
        this.nfse = response.nfse
      });
  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);
    this.continue = confirm('Deseja cadastrar outra empresa?');
    this.continue === true ? window.location.reload() : this.cancel();
  }
}
