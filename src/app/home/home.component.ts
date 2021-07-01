import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Integração Protheus';

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home', icon: 'po-icon-home', shortLabel: 'Principal' },
    { label: 'Usuarios', link: './users', icon: 'po-icon-finance', shortLabel: 'Usuários' },
    { label: 'ConsultaCNPJ', link: './cnpj', icon: 'po-icon po-icon-company', shortLabel: 'ConsultaCNPJ' },
    { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-users', shortLabel: 'Logout'  }
  ];

  constructor(private router: Router, private storage: PoStorageService) { }

  logout(): void {
  };

}
