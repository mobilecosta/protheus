import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Integração Protheus';

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home', icon: 'po-icon-home', shortLabel: 'Principal' }]

  /*
  { label: 'Usuarios', link: './users', icon: 'po-icon-finance', shortLabel: 'Usuários' },
  { label: 'ConsultaCNPJ', link: './cnpj', icon: 'po-icon po-icon-company', shortLabel: 'ConsultaCNPJ' },
  { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-users', shortLabel: 'Logout'  }
];*/

  constructor(private httpClient: HttpClient, private router: Router, private storage: PoStorageService, private poNotification: PoNotificationService) {

    // delete daqui apagando as duas delcarações de items
    var items = [
      { label: 'Usuarios', link: './users', icon: 'po-icon-finance', shortLabel: 'Usuários' },
      { label: 'CNPJ', link: './cnpj', icon: 'po-icon po-icon-company', shortLabel: 'CNPJ' },
      { label: 'Empresas', link: './companies', icon: 'po-icon po-icon-agro-business', shortLabel: 'Companies' },
      { label: 'NF-e', link: './', icon: 'po-icon po-icon-sale', shortLabel: 'nfe' },
      { label: 'NFSe', link: './nfse', icon: 'po-icon po-icon-sale', shortLabel: 'nfse' },
      { label: 'Logout', link: './login', icon: 'po-icon-users', shortLabel: 'Logout' }
      // { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-users', shortLabel: 'Logout' }

    ]
    items.forEach((value, index) => {
      this.menus.push({ label: value['label'], link: value['link'], icon: value['icon'], shortLabel: value['shortLabel'] })
    })
    // até aqui

    //descomente daqui para dá acesso pela api
    // campos obrigatórios na api (label: value['label'], link: value['link'], icon: value['icon'], shortLabel: value['shortLabel']})
    // reference PO-UI

    /*
     * var url = environment.apimenu;
    this.httpClient.get(url).subscribe((res) =>{
        res.forEach((value, index)=>{
          //this.menus.push({label: value['label'], link: value['link'], icon: value['icon'], shortLabel: value['shortLabel']})
        })
      }, (res) =>{poNotification.error('API Server Error')})
      * */
    // até aqui

  }
  logout(): void {
  };

}
