import { CompaniesComponent } from "./companies.component";
import { NgModule, ViewChild } from "@angular/core";
import { AppComponent } from "../app.component";
import { CnpjRoutingModule } from "./companies-routing.module";
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
        CompaniesComponent
    ],
    providers: []
})

export class CompaniesModule { }




