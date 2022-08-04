import { Endereco } from './../../shared/companies';
import { Tomador } from './../../shared/nfse';
import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';
import { Cancelamento, Declaracao_prestacao_servico, Mensagens, Nfse, Prestador } from '../../shared/nfse';

@Component({
  selector: 'app-grid-view',
  templateUrl: './nfse-view.component.html'
})
export class NfseViewComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.apiNS + '/nfse';

  private gridRemoveSub: Subscription;
  private gridSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  nfseData: Nfse = {} as Nfse
  prestador: Prestador = {} as Prestador


  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private auth: AuthService) { }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    this.paramsSub = this.route.params.subscribe(params => this.loadData(params['id']));
    // this.empresa.endereco = {} as Endereco;
    //   declaracao_prestacao_servico: Declaracao_prestacao_servico
    // cancelamento: Cancelamento
    // mensagens: Mensagens
    this.nfseData = {} as Nfse
    this.nfseData.declaracao_prestacao_servico = {} as Declaracao_prestacao_servico
    this.nfseData.declaracao_prestacao_servico.prestador = {} as Prestador
    this.nfseData.declaracao_prestacao_servico.tomador.endereco = {} as Endereco
    this.nfseData.cancelamento = {} as Cancelamento
    this.nfseData.mensagens = {} as Mensagens
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.gridSub.unsubscribe();

    if (this.gridRemoveSub) {
      this.gridRemoveSub.unsubscribe();
    }
  }

  back() {
    this.router.navigateByUrl('nfse');
  }

  edit() {
    this.router.navigateByUrl(`nfse/edit/${this.nfseData.id}`);
  }

  remove() {
    this.gridRemoveSub = this.httpClient.delete(`${this.url}?id=eq.${this.nfseData.id}`, { headers: this.headers })
      .subscribe(() => {
        this.poNotification.warning('Registro apagado com sucesso.');

        this.back();
      });
  }


  private loadData(nfseData) {
    this.gridSub = this.httpClient.get(`${this.url}/${nfseData}`, { headers: this.headers })
      .subscribe((response: Nfse) => {
        this.nfseData = response
        //   .subscribe(response => this.nfseData = response[0]);
        console.info(this.nfseData);

      })
  }

}
