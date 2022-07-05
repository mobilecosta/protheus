import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';

import { Subscription } from 'rxjs';

import {
  PoCheckboxGroupOption, PoRadioGroupOption, PoDisclaimer, PoDisclaimerGroup,
  PoModalComponent, PoModalAction, PoNotificationService, PoPageFilter, PoPageAction,
  PoTableAction, PoTableColumn, PoTableComponent
} from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './companies-list.component.html'
})
export class CompaniesListComponent implements OnInit, OnDestroy {

  private readonly url: string = environment.apicompanies + '/empresas';

  private clienteRemoveSub: Subscription;
  private clientesSub: Subscription;
  private offset: number = 1;
  private limit: number = 13;
  private order: string;
  private searchTerm: string = '';
  private searchFilters: any;
  private headers: HttpHeaders;

  public readonly actions: Array<PoPageAction> = [
    { action: this.onNewCliente.bind(this), label: 'Cadastrar', icon: 'po-icon-user-add' },
    { action: this.onRemoveClientes.bind(this), label: 'Remover empresas' },
    { action: this.ngOnInit(), label: 'Pagina Inicial' }
  ];

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: this.onConfirmAdvancedFilter.bind(this),
    label: 'Pesquisar'
  };

  public readonly advancedFilterSecondaryAction: PoModalAction = {
    action: () => this.advancedFilter.close(),
    label: 'Cancelar'
  };

  public readonly columns: Array<PoTableColumn> = [
    { property: 'endereco_logradouro', label: 'Endereço' },
    { property: 'endereco_numero', label: 'Numero' },
    // { property: 'cpf_cnpj', label: 'CPF ou CNPJ' },
    { property: 'endereco_bairro', label: 'Bairro' },
    { property: 'endereco_cidade', label: 'Cidade' },
    { property: 'endereco_codigo_municipio', label: 'Código município' },
    { property: 'endereco_cidade', label: 'Cidade' },
    { property: 'endereco_uf', label: 'UF' },
    { property: 'endereco_codigo_pais', label: 'Código Pais' },
    { property: 'endereco_pais', label: 'Pais' },
    { property: 'endereco_cep', label: 'CEP' },
  ];
  // public readonly columns: Array<PoTableColumn> = [
  //   { property: 'cpf_cnpj', label: 'CPF ou CNPJ' },
  //   { property: 'nome_razao_social', label: 'Razão social' },
  //   { property: 'fone', label: 'Telefone' }
  // ];

  public readonly disclaimerGroup: PoDisclaimerGroup = {
    change: this.onChangeDisclaimerGroup.bind(this),
    disclaimers: [],
    title: 'Filtros aplicados em nossa pesquisa'
  };

  public readonly filter: PoPageFilter = {
    action: this.onActionSearch.bind(this),
    advancedAction: this.openAdvancedFilter.bind(this),
    ngModel: 'searchTerm',
    placeholder: 'Pesquisa rápida ...'
  };

  public readonly tableActions: Array<PoTableAction> = [
    { action: this.onViewCliente.bind(this), label: 'Visualizar' },
    { action: this.onEditCliente.bind(this), label: 'Editar' },
    { action: this.onRemoveCliente.bind(this), label: 'Remover', type: 'danger', separator: true }
  ];

  public empresasData: string;
  public enderecoData: string;
  public hasNext: boolean = false;
  public loading: boolean = true;
  public cpf_cnpj: string;
  public fone: string;

  @ViewChild('advancedFilter', { static: true }) advancedFilter: PoModalComponent;
  @ViewChild('table', { static: true }) table: PoTableComponent;
  authService: any;

  constructor(private httpClient: HttpClient, private router: Router,
    private poNotification: PoNotificationService,
    private auth: AuthService) { }

  ngOnInit() {
    this.order = "cpf_cnpj";
    let params: any = {
      offset: 1,
      limit: this.limit,
      order: this.order
    };

    this.loadData(params);
  }

  ngOnDestroy() {
    this.clientesSub.unsubscribe();

    if (this.clienteRemoveSub) {
      this.clienteRemoveSub.unsubscribe();
    };
  }

  openAdvancedFilter() {
    this.advancedFilter.open();
  }

  sortBy(event) {
    this.offset = 1;
    this.order = event.column.property;
    let params: any = {
      offset: this.offset,
      limit: this.limit,
      order: this.order
    };

    if (event) {
      params.order = params.order + `${event.type === 'descending' ? '.desc' : ''}`;
    }

    this.disclaimerGroup.disclaimers.forEach(disclaimer => {
      params[disclaimer.property] = disclaimer.value
      this.searchFilters[disclaimer.property] = disclaimer.value;
    });

    this.loadData(params);
  }

  showMore(event) {
    this.offset = this.offset + this.limit;
    let params: any = { offset: this.offset, limit: this.limit, order: this.order };

    if (event) {
      params.order = params.order + `${event.type === 'descending' ? '.desc' : ''}`;
    };

    this.disclaimerGroup.disclaimers.forEach(disclaimer => {
      params[disclaimer.property] = disclaimer.value
      this.searchFilters[disclaimer.property] = disclaimer.value;
    });

    this.loadData(params);
  }

  private loadData(params: { page?: number, search?: string } = {}) {
    this.loading = true;

    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'esyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    // this.headers.append('Range', (this.offset - 1) + '-' + (this.limit - 1))

    this.clientesSub = this.httpClient.get(this.url, { headers: this.headers, params: <any>params })
      .subscribe((response: any) => {
        // this.empresasData = response.data.nome_razao_social;
        this.enderecoData = response.data;
        // this.hasNext = this.empresasData.length == this.limit;
        // this.hasNext = this.enderecoData.length == this.limit;
        this.loading = false;
        // console.log(this.enderecoData)
        // console.log(this.empresasData)
        // public cpf_cnpj: string;
        // public nome_razao_social: string;
        // public fone: string;

      });
  }

  private onActionSearch() {
    this.disclaimerGroup.disclaimers = [{
      label: `Pesquisa rápida: ${this.searchTerm}`,
      property: 'cpf_cnpj',
      value: 'like.*' + this.searchTerm + '*'
    }];
  }

  private onChangeDisclaimerGroup(disclaimers: Array<PoDisclaimer>) {
    this.searchFilters = {};

    let params: any = { offset: 1, limit: this.limit, order: this.order };

    disclaimers.forEach(disclaimer => {
      params[disclaimer.property] = disclaimer.value
      this.searchFilters[disclaimer.property] = disclaimer.value;
    });

    this.loadData(params);
  }

  private onConfirmAdvancedFilter() {
    const addDisclaimers = (property: string, value: string, label: string) =>
      value && this.disclaimerGroup.disclaimers.push({ property, value, label: `${label}: ${value}` });

    this.disclaimerGroup.disclaimers = [];

    this.advancedFilter.close();
  }

  private onEditCliente(empresas) {
    this.router.navigateByUrl(`companies/edit/${empresas.cpf_cnpj}`);
  }

  private onNewCliente() {
    this.router.navigateByUrl('companies/new');
  }

  private onRemoveCliente(empresa) {
    this.clienteRemoveSub = this.httpClient.delete(`${this.url}?cpf_cnpj=eq.${empresa.cpf_cnpj}`, { headers: this.headers })
      .subscribe(() => {
        this.poNotification.warning('Cliente ' + empresa.cpf_cnpj + ' apagado com sucesso.');

        this.empresasData.slice(this.empresasData.indexOf(empresa), 1);
      });
  }

  private onRemoveClientes() {
    const selectedClientes = this.table.getSelectedRows();

    selectedClientes.forEach(empresa => {
      this.onRemoveCliente(empresa);
    });

  }

  private onViewCliente(empresa) {
    console.log(empresa);
    
    this.router.navigateByUrl(`companies/view/${empresa.cpf_cnpj}`)
  }
}