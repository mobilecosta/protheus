import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoFieldModule, PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-cnpj',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  title = 'ConsultaCNPJ';
  public form: FormGroup;

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home', icon: 'po-icon-home', shortLabel: 'Principal' },
    { label: 'Usuarios', link: './users', icon: 'po-icon-finance', shortLabel: 'Usuários' },
    { label: 'ConsultaCNPJ', link: './cnpj', icon: 'po-icon po-icon-company', shortLabel: 'ConsultaCNPJ' },
  ];


  constructor(private httpClient: HttpClient, private input: PoFieldModule, private formBuilder: FormBuilder, private poNotification: PoNotificationService) {
    this.form = this.formBuilder.group({
      cnpj: [
        '', Validators.compose([Validators.maxLength(14), Validators.minLength(14), Validators.required])
      ]
    })


  }
  conultarcnpj() {


    const cnpj = this.form.controls['cnpj'].value;
    var url = environment.apicnpj + cnpj;

    this.httpClient.get(url).subscribe((res) => {
      this.poNotification.success(`NPJ Válido: ${cnpj} | Razao Social: ${res['razao_social']}`)
    }, (res) => {
      this.poNotification.error("CNPJ inválido")
    })
  }


  ngOnInit(): void {
  }

}
