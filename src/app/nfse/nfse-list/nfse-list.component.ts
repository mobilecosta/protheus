import { Nfse } from '../../shared/nfse';

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
import { type } from 'os';
import { report } from 'process';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './nfse-list.component.html'
})
export class NfseListComponent implements OnInit, OnDestroy {

  private readonly url: string = environment.apiNS + '/nfse?cpf_cnpj=10480616000160';

  private clienteRemoveSub: Subscription;
  private nfseSub: Subscription;
  private offset: number = 1;
  private limit: number = 13;
  private order: string;
  private searchTerm: string = '';
  private searchFilters: any;
  private headers: HttpHeaders;

  public readonly actions: Array<PoPageAction> = [
    { action: this.onNewNfse.bind(this), label: 'Emitir NFS-e', icon: 'po-icon po-icon-sale' },
    { action: this.onRemoveNfses.bind(this), label: 'Remover NFS-e' },
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
    { property: 'nome_razao_social', label: 'Razão social' },
    { property: 'numero', label: 'Número' },
    { property: 'cpf_cnpj', label: 'CPF ou CNPJ' },
    { property: 'rps_identificacao_rps_numero', label: 'Nº RPS' },
    { property: 'rps_identificacao_rps_serie', label: 'Série' },
    { property: 'rps_data_emissao', label: 'Emissão RPS', type: 'date' },
    { property: 'fone', label: 'Telefone' },
    { property: 'status', label: 'Status' },
  ];

  // public readonly columns: Array<PoTableColumn> = [
  //   { property: 'sfj_pessoa', label: 'Código' },
  //   { property: 'sfj_nome', label: 'Nome' },
  //   { property: 'sfj_fone', label: 'Telefone' }
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
    { action: this.onViewNfse.bind(this), label: 'Visualizar' },
    { action: this.onEditNfse.bind(this), label: 'Editar' },
    { action: this.onRemoveCliente.bind(this), label: 'Remover', type: 'danger', separator: true }
  ];

  // public clientes: Array<any> = [];
  hasNext: boolean = false;
  loading: boolean = true;
  //  sfj_nome: string;
  cpf_cnpj: string;
  nfsesData: Array<Nfse>
  items: Array<any>
  fone: string;

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
    this.nfseSub.unsubscribe();

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
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    this.headers.append('Range', (this.offset - 1) + '-' + (this.limit - 1))
    // let cnpjTemp:string = prompt("Digite o CNPJ da empresa")
    this.nfseSub = this.httpClient.get(this.url, { headers: this.headers, params: <any>params })
      .subscribe((response: any) => {
        this.nfsesData = response.data
        this.items = this.nfsesData.map(report => {
          return {
            status: report.status,
            numero: report.numero,
            nome_razao_social: report.declaracao_prestacao_servico.prestador.nome_razao_social,
            cpf_cnpj: report.declaracao_prestacao_servico.prestador.cpf_cnpj,
            rps_identificacao_rps_numero: report.declaracao_prestacao_servico.rps.identificacao_rps.numero,
            rps_identificacao_rps_serie: report.declaracao_prestacao_servico.rps.identificacao_rps.serie,
            rps_data_emissao: report.declaracao_prestacao_servico.rps.data_emissao,
            fone: report.declaracao_prestacao_servico.prestador.fone,





          }

        })
        this.loading = false;
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

  private onEditNfse(nfse) {
    console.log(nfse.numero);

    this.router.navigateByUrl(`/nfse/edit/${nfse.numero}`);
  }

  private onNewNfse() {
    this.router.navigateByUrl('/nfse/new');
  }

  private onRemoveCliente(cliente) {
    this.clienteRemoveSub = this.httpClient.delete(`${this.url}?cpf_cnpj=${cliente.cpf_cnpj}`, { headers: this.headers })
      .subscribe(() => {
        this.poNotification.warning('Cliente ' + cliente.cpf_cnpj + ' apagado com sucesso.');

        this.nfsesData.slice(this.nfsesData.indexOf(cliente), 1);
      });
  }

  private onRemoveNfses() {
    console.log('chhhch');

    const selectedClientes = this.table.getSelectedRows();
    console.log(selectedClientes);


    selectedClientes.forEach(cliente => {
      this.onRemoveCliente(cliente);
    });

  }

  private onViewNfse(nfse) {
    this.router.navigateByUrl(`/nfse/view/${nfse.cpf_cnpj}`);
  }
}
