import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption, PoDynamicFormField } from '@po-ui/ng-components';
import { PoPageDynamicEditActions, PoPageDynamicEditModule } from '@po-ui/ng-templates';

import { AuthService } from 'src/app/auth/auth.service';
import { Nfse, Declaracao_prestacao_servico, Rps, Identificacao_rps, Mensagens } from '../../shared/nfse';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'ngForm',
  templateUrl: './nfse-form.component.html'
})
export class NfseFormComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.apiNS + '/nfse';

  // public readonly actions: PoPageDynamicEditActions = {
  //   save: '/documentation/po-page-dynamic-detail',
  // };




  private action: string = actionInsert;
  private gridSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;
  numero: string = ""
  // public readonly serviceApi = environment.apiNS + '/nfse';

  public nfse: Nfse = {} as Nfse
  public rps: Rps = {} as Rps


  // public readonly fields: Array<PoDynamicFormField> = [
  //   { property: 'id', label: 'User ID' },
  //   { property: 'created_at', label: 'Data de Criação' },
  //   { property: 'status', label: 'Status' },
  //   { property: 'numero', label: 'Numero' },
  //   { property: 'codigo_verificacao', label: 'Código de verificação' },
  //   { property: 'link_url', label: 'Link URL' },
  //   { property: 'data_emissao', label: 'Data de Emissão' },
  //   { property: 'ambiente', label: 'Ambiente' },
  //   { property: 'referencia', label: 'Referencia' },
  //   {
  //     property: 'declaracao_prestacao_servico.rps.identificacao_rps.numero',
  //     label: 'Numero do RPS'
  //   },
  //   {
  //     property: 'declaracao_prestacao_servico.rps.identificacao_rps.serie',
  //     label: 'Série RPS'
  //   },
  //   {
  //     property: 'declaracao_prestacao_servico.rps.data_emissao',
  //     label: 'Data emissão RPS'
  //   },
  //   {
  //     property: 'declaracao_prestacao_servico.competencia',
  //     label: 'Competencia'
  //   },
  //   {
  //     property: 'declaracao_prestacao_servico.natureza_tributacao',
  //     label: 'Natureza Tributação'
  //   }
  // ]

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService) { }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.gridSub) {
      this.gridSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
        this.action = actionUpdate;

        this.nfse = {} as Nfse
        this.nfse.declaracao_prestacao_servico = {} as Declaracao_prestacao_servico
        this.nfse.declaracao_prestacao_servico.rps = {} as Rps
        this.nfse.declaracao_prestacao_servico.rps.identificacao_rps = {} as Identificacao_rps
        this.nfse.mensagens = {} as Mensagens

        // console.log(this.nfse);

      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/nfse');
  }

  save() {
    const record = { ...this.nfse };
    // console.log(record);


    // this.gridSub = this.isUpdateOperation
    //   ? this.httpClient.put(`${this.url}?id=eq.${record.id}`, record, { headers: this.headers })
    //     .subscribe(() => this.navigateToList('Registro atualizado com sucesso'))
    //   : this.httpClient.post(this.url, record, { headers: this.headers })
    //     .subscribe(() => this.navigateToList('Registro cadastrado com sucesso'));
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizar NFS-e' : 'Emitir NFS-e';
  }

  private loadData(id) {
    this.gridSub = this.httpClient.get(`${this.url}/${id}`, { headers: this.headers })
      .subscribe((response: Nfse) => {
        this.nfse = response
      })

  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/nfse');
  }
}
