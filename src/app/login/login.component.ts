import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoStorageService } from '@po-ui/ng-storage';

import { LoginService } from './login.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hideRememberUser: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private httpClient: HttpClient, 
    private storage: PoStorageService,
    private poNotification: PoNotificationService) { }

  loginSubmit(formData: PoPageLogin) {

    var url = environment.api + 
              'api/oauth2/v1/token?grant_type=password&password=' + formData.password + 
              '&username=' + formData.login;
    var body: any;

    this.httpClient.post(url, body).subscribe((res) => {
      this.storage.set('isLoggedIn', 'true').then(() => {
        localStorage.setItem('access_token', res["access_token"])
        this.router.navigate(['/']);
      });
    }, (res) => {
      if ((! res.hasOwnProperty('access_token')))
        { this.poNotification.error('Usuário ou senha invalidos ! Tente novamente.') };
    });

  }

}
