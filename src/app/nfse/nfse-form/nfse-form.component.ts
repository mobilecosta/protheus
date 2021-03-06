import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption, PoDynamicFormField } from '@po-ui/ng-components';
import { PoPageDynamicEditActions, PoPageDynamicEditModule } from '@po-ui/ng-templates';

import { AuthService } from 'src/app/auth/auth.service';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'app-nfse-form',
  templateUrl: './nfse-form.component.html'
})
export class NfseFormComponent implements OnDestroy, OnInit {

  private readonly url: string = 'http://localhost:3000' + '/nfse';
  public readonly serviceApi = 'http://localhost:3000';

  public readonly actions: PoPageDynamicEditActions = {
    save: '/documentation/po-page-dynamic-detail',
  };

  private action: string = actionInsert;
  private gridSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  public nfse: any = {};

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'name', divider: 'Personal data', required: true },
    { property: 'nickname' },
    { property: 'email', label: 'E-mail' },
  ]

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService) { }

  ngOnDestroy() {
    // this.paramsSub.unsubscribe();

    // if (this.gridSub) {
    //   this.gridSub.unsubscribe();
    // }
  }

  ngOnInit() {
    // this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        console.log(params);

        this.loadData(params['id']);
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/nfse');
  }

  save() {
    const record = { ...this.nfse };
    console.log(record);


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
      .pipe(
        map((cliente: any) => {
          return cliente[0];
        })
      )
      .subscribe(response => this.nfse = response);
  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/nfse');
  }

}
