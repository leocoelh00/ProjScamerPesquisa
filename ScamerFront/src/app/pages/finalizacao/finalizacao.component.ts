import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-finalizacao',
    templateUrl: './finalizacao.component.html',
    styleUrls: ['./finalizacao.component.scss']
})
export class FinalizacaoComponent implements OnInit {

    nr_Cpf: string
    nm_Rota: string

    objArrayMensagens: any = []

    b_Loading_Finalizado: boolean = true

    tp_Origem: string

    ds_Button: string = "assets/images/voltar2.svg"
    ds_Img: string = "assets/images/volta.svg"
    ds_Class: string = "Voltar"

    constructor(
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit(): void {

        window.scrollTo(0, 0);
        this.tp_Origem = this.dataService.Get_Dados("tp_Origem")
        this.nr_Cpf = this.activatedRoute.snapshot.paramMap.get('id')
        this.nm_Rota = '/home/' + this.nr_Cpf
        this.objArrayMensagens = [`Ótimo 😊 ,  acabei de finalizar sua pesquisa, muito obrigado pela sua avaliação.  `]

    }

}
