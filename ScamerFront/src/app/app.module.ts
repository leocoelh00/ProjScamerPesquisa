import { MatSnackBarDismiss, MatSnackBarRef } from './../../node_modules/@angular/material/snack-bar/snack-bar-ref.d';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { LoginComponent } from "./pages/login/login.component";
import { GraphQLModule } from "./graphql.module";
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { EscalaComponent } from './components/escala/escala.component';
import { EscalaPequenaComponent } from './components/escala-pequena/escala-pequena.component';
import { FinalizacaoComponent } from './pages/finalizacao/finalizacao.component';
import { AvaliacoesComponent } from './pages/avaliacoes/avaliacoes.component';
import { NgPipesModule } from 'ngx-pipes';

registerLocaleData(ptBr, 'pt-BR')


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoadingComponent,
        CabecalhoComponent,
        AvaliacoesComponent,
        PesquisaComponent,
        EscalaComponent,
        EscalaPequenaComponent,
        LoadingComponent,
        FinalizacaoComponent

    ],
    imports: [
        BrowserModule,
        GraphQLModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgPipesModule,
        IMaskModule,
        NzButtonModule,
        NzPopoverModule,
        NzCollapseModule,
        NzModalModule,
        NzToolTipModule,
        TextMaskModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule

    ],
    providers: [
        DatePipe,
        CurrencyPipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
