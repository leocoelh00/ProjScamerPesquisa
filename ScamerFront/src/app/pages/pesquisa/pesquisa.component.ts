
import { Component, OnInit, Renderer2, HostListener, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PesquisaService } from 'src/app/services/pesquisa.service';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-pesquisa',
    templateUrl: './pesquisa.component.html',
    styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {


    cd_Usuario_Pesquisa: string
    cd_Pergunta: number

    ds_Img: string = "assets/images/volta.svg"
    ds_Pergunta: any = []
    ds_Class: string = "Voltar"

    tp_Pesquisa: number

    ds_SubTitulo: string = ""
    nm_medico: string = ""
    dt_Atendimento: string = ""


    objArrayMensagens: any = []
    objPesquisa: any = {}

    nr_Cpf: string

    b_Exibir_Pergunta_Filha: boolean = false
    b_Loading_Finalizado: boolean = true
    b_Loading: boolean = false;
    b_Exibir_Pergunta_Principal: boolean = true
    botaoHabilitado: boolean = false;

    vl_Satisfacao: number = 0;
    vl_Satisfacao_Filha: number

    nm_Rota: string

    tp_Origem: string

    ds_Button: string = "assets/images/account.svg"

    currentIndex = 0;

    constructor(
        private pesquisaService: PesquisaService,
        private activateRoute: ActivatedRoute,
        private dataService: DataService,
        private cdr: ChangeDetectorRef,
        private route: Router
    ) { }

    ngOnInit(): void {

        window.scrollTo(0, 0);
        // this.b_Loading = true
        this.cd_Usuario_Pesquisa = this.activateRoute.snapshot.paramMap.get('id')

        this.nm_Rota = "/login"

        this.pesquisaService.Get_Pesquisa(parseInt(this.cd_Usuario_Pesquisa)).then(res => {

            if (res.status) {
                this.cd_Pergunta = res.data.cd_Pergunta
                this.ds_Pergunta = res.data.ds_Pergunta
                this.tp_Pesquisa = res.data.tp_Pesquisa

                if (this.ds_SubTitulo != null) {

                    this.nm_medico = this.ds_SubTitulo.split(" - ")[0]
                    this.dt_Atendimento = this.ds_SubTitulo.split(" - ")[1]

                }

                this.objArrayMensagens = [`Ótimo 😊 , conversei com nossa equipe e me falaram que essa pesquisa é referente a um(a) ${this.tp_Pesquisa}  , realizada no dia ${this.dt_Atendimento}, pelo(a) médico(a) Dr(a). ${this.nm_medico} `]
                setTimeout(() => {
                    this.objArrayMensagens.push(...[`Fique tranquilo(a), suas respostas são sigilosas, não vou contar a ninguém.`])
                }, 1000)

                this.b_Loading = false
            }
        })
    }

    async Selecionar_Nota_Principal(vl_Satisfacao) {

        const objParam = {
            cd_Pergunta: this.cd_Pergunta,
            cd_Usuario_Pesquisa: parseInt(this.cd_Usuario_Pesquisa),
            nr_Resposta: parseInt(vl_Satisfacao)
        }

        this.vl_Satisfacao = vl_Satisfacao;

        await this.pesquisaService.Set_Incluir_Avaliacao_Pergunta(objParam);

        const elementId = `1`;
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

    }

    Confirmar() {
        this.route.navigate(["/finalizacao/"])
    }

    habilitarBotaoConfirmar(): boolean {

        return this.vl_Satisfacao != 0;
    }
}

