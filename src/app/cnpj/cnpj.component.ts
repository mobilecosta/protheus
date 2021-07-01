import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoMenuItem } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.scss']
})
export class CnpjComponent implements OnInit {
  
  title = 'ConsultaCNPJ';

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home', icon: 'po-icon-home', shortLabel: 'Principal' }
    
  ];


  

  constructor() {



   }

  ngOnInit(): void {
  }

}
