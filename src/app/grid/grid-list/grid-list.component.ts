import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  PoDisclaimer, PoDisclaimerGroup, PoTableAction, PoTableColumn, PoTableComponent,
  PoModalComponent, PoModalAction, PoNotificationService, PoPageFilter, PoPageAction
} from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html'
})
export class GridListComponent implements OnInit, OnDestroy {

  private readonly url: string = environment.api + '/users';

  private gridRemoveSub: Subscription;
  private gridSub: Subscription;
  private offset: number = 1;
  private limit: number = 13;
  private order: string;
  private searchTerm: string = '';
  private searchFilters: any;
  private headers: HttpHeaders;

  public readonly actions: Array<PoPageAction> = [
    { action: this.onNewGrid.bind(this), label: 'Cadastrar', icon: 'po-icon-user-add' },
    { action: this.onRemoveGrid.bind(this), label: 'Remover Registros' },
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
    { property: 'id', label: 'Código' },
    { property: 'userName', label: 'Usuário' },
    { property: 'displayName', label: 'Nome Completo' }
  ];

  public readonly disclaimerGroup: PoDisclaimerGroup = {
    change: this.onChangeDisclaimerGroup.bind(this),
    disclaimers: [ ],
    title: 'Filtros aplicados em nossa pesquisa'
  };

  public readonly filter: PoPageFilter = {
    action: this.onActionSearch.bind(this),
    advancedAction: this.openAdvancedFilter.bind(this),
    ngModel: 'searchTerm',
    placeholder: 'Pesquisa rápida ...'
  };


  public readonly tableActions: Array<PoTableAction> = [
    { action: this.onViewGrid.bind(this), label: 'Visualizar' },
    { action: this.onEditGrid.bind(this), label: 'Editar' },
    { action: this.onRemoveGrid.bind(this), label: 'Remover', type: 'danger', separator: true }
  ];

  public grid: Array<any> = [];
  public hasNext: boolean = false;
  public loading: boolean = true;

  @ViewChild('advancedFilter', { static: true }) advancedFilter: PoModalComponent;
  @ViewChild('table', { static: true }) table: PoTableComponent;
  authService: any;

  constructor(private httpClient: HttpClient, private router: Router, 
              private poNotification: PoNotificationService,
              private auth: AuthService) { }

  ngOnInit() {
    this.order = "id";
    let params: any = {
      offset: 1,
      limit: this.limit,
      order: this.order
    };

    this.loadData(params);
  }

  ngOnDestroy() {
    this.gridSub.unsubscribe();

    if (this.gridRemoveSub) {
      this.gridRemoveSub.unsubscribe();
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

  private loadData(params: { page?: number, search?: string } = { }) {
    this.loading = true;

    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers.append('Range', (this.offset - 1) + '-' + (this.limit - 1))

    this.gridSub = this.httpClient.get(this.url, { headers: this.headers, params: <any>params })
      .subscribe((response: any) => {
        this.grid = response.resources;
        this.hasNext = this.grid.length == this.limit;
        this.loading = false;
      });
  }

  private onActionSearch() {
    this.disclaimerGroup.disclaimers = [{
      label: `Pesquisa rápida: ${this.searchTerm}`,
      property: 'sfj_nome',
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
      value && this.disclaimerGroup.disclaimers.push({property, value, label: `${label}: ${value}`});

    this.disclaimerGroup.disclaimers = [];

    this.advancedFilter.close();
  }

  private onEditGrid(record) {
    this.router.navigateByUrl(`/grid/edit/${record.id}`);
  }

  private onNewGrid() {
    this.router.navigateByUrl('/grid/new');
  }

  private onRemoveGrid(record) {
    this.gridRemoveSub = this.httpClient.delete(`${this.url}?id=eq.${record.id}`, { headers: this.headers } )
      .subscribe(() => {
        this.poNotification.warning('Registro ' + record.id + ' apagado com sucesso.');

        this.grid.splice(this.grid.indexOf(record), 1);
      });
  }

  private onRemoveRegs() {
    const selectedClientes = this.table.getSelectedRows();

    selectedClientes.forEach(cliente => {
      this.onRemoveGrid(cliente);
    });

  }

  private onViewGrid(record) {
    this.router.navigateByUrl(`/grid/view/${record.id}`);
  }}
