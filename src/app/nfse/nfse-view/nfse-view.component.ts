import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';
import { Nfse } from '../../shared/nfse';

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

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private auth: AuthService) { }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    this.paramsSub = this.route.params.subscribe(params => this.loadData(params['cpf_cnpj']));
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

  private loadData(cpf_cnpj) {
    this.gridSub = this.httpClient.get(`${this.url}?cpf_cnpj=${cpf_cnpj}`, { headers: this.headers })
      .pipe(
        map((grid: Nfse) => {
          return grid;
        })
      )
      .subscribe(response => this.nfseData = response);
    console.log(this.nfseData);

  }

}
