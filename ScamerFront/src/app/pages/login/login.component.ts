import { ActivatedRoute, Router } from '@angular/router';


import { PesquisaService } from './../../services/pesquisa.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { LoginFormService } from "src/app/forms/login.form";
import { AuthService } from 'src/app/services/auth.service';
import { Mascaras } from 'src/app/utils/mascaras/mascaras.model';
import { SubjectService } from 'src/app/services/subject.service';
import { DataService } from 'src/app/services/data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    private config: MatSnackBarConfig;

    @ViewChild('InputLogin') InputLogin: ElementRef;


    formGroup = this.formService.Get_Form
    objPesquisa: any = {}
    lst_PesquisasUsuario: any = {}
    b_Loading: boolean = false
    nr_Tamanho_Model: number = 350;
    bExibirValorPassword: boolean = false;

    tp_Origem: string

    objLogin: any = {
        usuario: "",
        senha: ""
    };

    constructor(
        private PesquisaService: PesquisaService,
        private formService: LoginFormService,
        private authService: AuthService,
        private route: Router,
        private activateRoute: ActivatedRoute,
        private subjectService: SubjectService,
        private dataService: DataService,
        private modalService: NzModalService,
        private renderer: Renderer2
    ) {
    }

    ngOnInit(): void {

        this.tp_Origem = this.activateRoute.snapshot.paramMap.get('tp_Origem');

        this.dataService.Set_Dados("tp_Origem", this.tp_Origem)

    }

    ngAfterViewInit() {
        if (this.isMobile()) {
            this.renderer.selectRootElement(this.InputLogin.nativeElement).focus();
            this.renderer.selectRootElement(this.InputLogin.nativeElement).setSelectionRange(0, this.InputLogin.nativeElement.value.length);
        }
    }

    private isMobile(): boolean {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    logar() {
        this.b_Loading = true

        this.authService.Login(this.objLogin.usuario.trim(), this.objLogin.senha.trim()).
        then(res => {

            if(res.data.sn_Login){
                    this.route.navigate(["/avaliacoes"])
            }
            else{
                this.b_Loading = false;
            }
        })

    }

    Exibir_Senha() {
        this.bExibirValorPassword = (this.bExibirValorPassword) ? false : false;

        let x = document.querySelector<HTMLInputElement>("#password")

        x.type = (x.type === "password") ? "text" : "password";
    }

}
