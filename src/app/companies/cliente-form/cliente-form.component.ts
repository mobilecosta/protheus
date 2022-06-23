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
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.apicompanies + '/empresas';

  private action: string = actionInsert;
  private clienteSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  public cliente: any = {};

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService) { }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.clienteSub) {
      this.clienteSub.unsubscribe();
    }
  }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU0NTIzMzMsInRlbmFudF9pZCI6IldhZ25lciBNb2JpbGUgQ29zdGEjOTY2OCJ9.zBC9QpfHhDJmFWI9yUxeQNv819piFqN8v6utLOSJphI');
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['nome_razao_social']) {
        this.loadData(params['nome_razao_social']);
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/empresas');
  }

  save() {
    const cliente = { ...this.cliente };

    this.clienteSub = this.isUpdateOperation
      ? this.httpClient.put(`${this.url}?nome_razao_social=eq.${cliente.nome_razao_social}`, cliente, { headers: this.headers })
        .subscribe(() => this.navigateToList('Cliente atualizado com sucesso'))
      : this.httpClient.post(this.url, cliente, { headers: this.headers })
        .subscribe(() => this.navigateToList('Cliente cadastrado com sucesso'));
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizando empresas' : 'Nova empresa';
  }

  private loadData(nome_razao_social) {
    this.clienteSub = this.httpClient.get(`${this.url}?nome_razao_social=eq.${nome_razao_social}`, { headers: this.headers })
      .pipe(
        map((cliente: any) => {
          return cliente[0];
        })
      )
      .subscribe(response => this.cliente = response);
  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/empresas');
  }

}
