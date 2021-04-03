import { environment } from 'src/environments/environment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AuthService } from 'src/app/auth/auth.service';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html'
})
export class GridFormComponent implements OnDestroy, OnInit {

  private readonly url: string = environment.api + '/users';

  private action: string = actionInsert;
  private gridSub: Subscription;
  private paramsSub: Subscription;
  private headers: HttpHeaders;

  public grid: any = { };

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
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/grid');
  }

  save() {
    const record = {...this.grid};

    this.gridSub = this.isUpdateOperation
      ? this.httpClient.put(`${this.url}?id=eq.${record.id}`, record, { headers: this.headers } )
        .subscribe(() => this.navigateToList('Registro atualizado com sucesso'))
      : this.httpClient.post(this.url, record, { headers: this.headers } )
        .subscribe(() => this.navigateToList('Registro cadastrado com sucesso'));
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizando' : 'Novo';
  }

  private loadData(id) {
    this.gridSub = this.httpClient.get(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(
        map((cliente: any) => {
          return cliente[0];
        })
      )
      .subscribe(response => this.grid = response);
  }

  private navigateToList(msg: string) {
    this.poNotification.success(msg);

    this.router.navigateByUrl('/grid');
  }

}
