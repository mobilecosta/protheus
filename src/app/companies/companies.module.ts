import { CnpjComponent } from "./cnpj.component";
import { NgModule, ViewChild } from "@angular/core";
import { AppComponent } from "../app.component";
import { CnpjRoutingModule } from "./cpnj-routing.module";
import { PoModule, PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CnpjRoutingModule,
        PoModule,
        PoFieldModule,
        FormsModule, ReactiveFormsModule, PoButtonModule
    ],
    declarations: [
        CnpjComponent
    ],
    providers: []
})

export class CompaniesModule { }




