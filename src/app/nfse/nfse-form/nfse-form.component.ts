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
import { NfsePost, RpsNfesPost, Prestador, Tomador, Intermediario, ConstrucaoCivil, EnderecoTomador, Servicos } from '../../shared/nfse-post';

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
  numero: string =
    // public readonly serviceApi = environment.apiNS + '/nfse';

    public nfse: Nfse = {} as Nfse
  public nfsePost: NfsePost = {} as NfsePost


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

  async ngOnInit() {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
        this.action = actionUpdate;
      }
    });
    this.nfse = {} as Nfse
    this.nfse.declaracao_prestacao_servico = {} as Declaracao_prestacao_servico
    this.nfse.declaracao_prestacao_servico.rps = {} as Rps
    this.nfse.declaracao_prestacao_servico.rps.identificacao_rps = {} as Identificacao_rps
    this.nfse.mensagens = {} as Mensagens

    this.nfsePost = {} as NfsePost
    this.nfsePost.rps = {} as RpsNfesPost
    this.nfsePost.rps.prestador = {} as Prestador
    this.nfsePost.rps.tomador = {} as Tomador
    this.nfsePost.rps.tomador.endereco = {} as EnderecoTomador
    this.nfsePost.rps.intermediario = {} as Intermediario
    this.nfsePost.rps.construcao_civil = {} as ConstrucaoCivil
    this.nfsePost.rps.servicos = {} as Servicos



  }

  cancel() {
    this.router.navigateByUrl('/nfse');
  }

  async save() {
    const record = { ...this.nfse };

    let body = {
      ambiente: this.nfsePost.ambiente,
      rps: {
        referencia: this.nfsePost.rps.referencia,
        data_emissao: this.nfsePost.rps.data_emissao,
        competencia: this.nfsePost.rps.competencia,
        natureza_tributacao: this.nfsePost.rps.natureza_tributacao,
        prestador: {
          cpf_cnpj: this.nfsePost.rps.prestador.cpf_cnpj
        },
        tomador: {
          cpf_cnpj: this.nfsePost.rps.tomador.cpf_cnpj,
          inscricao_municipal: this.nfsePost.rps.tomador.inscricao_municipal,
          nome_razao_social: this.nfsePost.rps.tomador.nome_razao_social,
          fone: this.nfsePost.rps.tomador.fone,
          email: this.nfsePost.rps.tomador.email,
          endereco: {
            logradouro: this.nfsePost.rps.tomador.endereco.logradouro,
            numero: this.nfsePost.rps.tomador.endereco.numero,
            complemento: this.nfsePost.rps.tomador.endereco.complemento,
            bairro: this.nfsePost.rps.tomador.endereco.bairro,
            codigo_municipio: this.nfsePost.rps.tomador.endereco.codigo_municipio,
            cidade: this.nfsePost.rps.tomador.endereco.cidade,
            uf: this.nfsePost.rps.tomador.endereco.cidade,
            codigo_pais: this.nfsePost.rps.tomador.endereco.codigo_pais,
            pais: this.nfsePost.rps.tomador.endereco.pais,
            cep: this.nfsePost.rps.tomador.endereco.cep
          }
        },
        intermediario: {
          cpf_cnpj: this.nfsePost.rps.intermediario.cpf_cnpj,
          nome_razao_social: this.nfsePost.rps.intermediario.nome_razao_social,
          inscricao_municipal: this.nfsePost.rps.intermediario.inscricao_municipal
        },
        construcao_civil: {
          codigo_obra: this.nfsePost.rps.construcao_civil.codigo_obra,
          art: this.nfsePost.rps.construcao_civil.art
        },
        servicos: [
          {
            iss_retido: this.nfsePost.rps.servicos.iss_retido,
            responsavel_retencao: this.nfsePost.rps.servicos.responsavel_retencao,
            item_lista_servico: this.nfsePost.rps.servicos.item_lista_servico,
            codigo_cnae: this.nfsePost.rps.servicos.codigo_cnae,
            codigo_tributacao_municipio: this.nfsePost.rps.servicos.codigo_tributacao_municipio,
            discriminacao: this.nfsePost.rps.servicos.discriminacao,
            codigo_municipio: this.nfsePost.rps.servicos.codigo_municipio,
            codigo_pais: this.nfsePost.rps.servicos.codigo_pais,
            tipo_tributacao: this.nfsePost.rps.servicos.tipo_tributacao,
            exigibilidade_iss: this.nfsePost.rps.servicos.exigibilidade_iss,
            codigo_municipio_incidencia: this.nfsePost.rps.servicos.codigo_municipio_incidencia,
            numero_processo: this.nfsePost.rps.servicos.numero_processo,
            unidade: this.nfsePost.rps.servicos.unidade,
            quantidade: this.nfsePost.rps.servicos.quantidade,
            valores: {
              valor_unitario: this.nfsePost.rps.servicos.valores.valor_unitario,
              valor_servicos: this.nfsePost.rps.servicos.valores.valor_servicos,
              valor_deducoes: this.nfsePost.rps.servicos.valores.valor_deducoes,
              valor_pis: this.nfsePost.rps.servicos.valores.valor_pis,
              valor_cofins: this.nfsePost.rps.servicos.valores.valor_cofins,
              valor_inss: this.nfsePost.rps.servicos.valores.valor_inss,
              valor_ir: this.nfsePost.rps.servicos.valores.valor_ir,
              valor_csll: this.nfsePost.rps.servicos.valores.valor_csll,
              valor_outras_retencoes: this.nfsePost.rps.servicos.valores.valor_outras_retencoes,
              valor_iss: this.nfsePost.rps.servicos.valores.valor_iss,
              valor_iss_retido: this.nfsePost.rps.servicos.valores.valor_iss_retido,
              valor_liquido: this.nfsePost.rps.servicos.valores.valor_liquido,
              aliquota_iss: this.nfsePost.rps.servicos.valores.aliquota_iss,
              aliquota_pis: this.nfsePost.rps.servicos.valores.aliquota_pis,
              aliquota_cofins: this.nfsePost.rps.servicos.valores.aliquota_cofins,
              aliquota_inss: this.nfsePost.rps.servicos.valores.aliquota_inss,
              aliquota_ir: this.nfsePost.rps.servicos.valores.aliquota_ir,
              aliquota_csll: this.nfsePost.rps.servicos.valores.aliquota_csll,
              desconto_incondicionado: this.nfsePost.rps.servicos.valores.desconto_incondicionado,
              desconto_condicionado: this.nfsePost.rps.servicos.valores.desconto_condicionado,
            }
          }
        ]
      }
    }

    this.gridSub = this.isUpdateOperation
      ? this.httpClient.put(`${this.url}/${record.id}`, body, { headers: this.headers })
        .subscribe(() => this.navigateToList('Registro atualizado com sucesso'))
      : this.httpClient.post(`${this.url}`, body, { headers: this.headers })
        .subscribe(() => this.navigateToList('Registro cadastrado com sucesso'));
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizar NFS-e' : 'Emitir NFS-e';
  }

  private loadData(response) {
    this.gridSub = this.httpClient.get(`${this.url}/${response.id}`, { headers: this.headers })
      .subscribe((response: Nfse) => {
        this.nfse = response
        console.log(loadData CNPJ DO LOGIN);
        console.log(this.nfse);

      })

  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/nfse');
  }
}
