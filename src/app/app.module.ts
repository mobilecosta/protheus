import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { LoginService } from './login/login.service';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './auth/auth-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CnpjComponent } from './cnpj/cnpj.component';
import { CnpjModule } from './cnpj/cnpj.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    LoginModule,
    CnpjModule
    
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
