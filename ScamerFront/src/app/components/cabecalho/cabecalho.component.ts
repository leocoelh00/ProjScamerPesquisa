import { DataService } from './../../services/data.service';
import { Location } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { SubjectService } from 'src/app/services/subject.service';
import packageInfo from '../../../../package.json';

@Component({
    selector: 'app-cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

    @Input('showMenu') showMenu: boolean = false;

    /** @description Versao do sistema */
    ds_Version: string

    /** @description Boolean para exibir a logo ou nao */
    b_Exibir_Logo = true

    b_IsMobile: boolean;

    /** @description Quantidade de Pendencias para o usuário */
    nr_Quantidade_Pendencias = 0

    @Input() Rota: string

    @Input() b_Exibir_Voltar: boolean

    @Input() ds_Button: string

    constructor(
        private location: Location,
        private router: Router,
        private subjectService: SubjectService,
        private dataService: DataService,
        public route: Router
    ) { }

    ngOnInit() {
        this.ds_Version = packageInfo.version;

        this.b_IsMobile = false;


        this.checkScreenSize()
    }

    Voltar(Rota) {
        this.route.navigate([Rota])
    }


    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.checkScreenSize();
    }


    checkScreenSize() {
        if (window.innerWidth > 768) {
            this.b_IsMobile = true;
        } else {
            this.b_IsMobile = false
        }

    }
}
