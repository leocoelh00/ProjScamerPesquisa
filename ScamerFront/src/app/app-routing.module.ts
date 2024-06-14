import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { PesquisaComponent } from "./pages/pesquisa/pesquisa.component";
import { FinalizacaoComponent } from "./pages/finalizacao/finalizacao.component";
import { AvaliacoesComponent } from "./pages/avaliacoes/avaliacoes.component";

const routes: Routes = [
    {
        path: 'pesquisa/:id',
        component: PesquisaComponent,
        data: {animation: "HomePage"}
    },
    {
        path: 'login', component: LoginComponent,
        data: { animation: "LoginPage" },
    },
    {
        path: 'finalizacao',
        component: FinalizacaoComponent,
        data: {animation: "HomePage"}
    },
    {
        path: 'avaliacoes',
        component:AvaliacoesComponent,
        data: {animation: "LoginPage"}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
