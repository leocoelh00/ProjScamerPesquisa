import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-escala-pequena',
    templateUrl: './escala-pequena.component.html',
    styleUrls: ['./escala-pequena.component.scss']
})
export class EscalaPequenaComponent implements OnInit {
    @Output() On_Select = new EventEmitter()
    @Input() vl_Satisfacao: number

    numeros: any = [{ nm: "1", style: "div-SatisfDesignVerm", label: "Muito insatisfeito" }, { nm: "2", style: "div-SatisfDesignLarj", label: "Insatisfeito" }, { nm: "3", style: "div-SatisfDesignAm", label: "Indiferente" }, { nm: "4", style: "div-SatisfDesignVdCla", label:"Satisfeito" }, { nm: "5", style: "div-SatisfDesignVdEsc", label: "Muito satisfeito" }]
    objPayload: any = {}

    constructor(private dataService: DataService) { }

    ngOnInit(): void {

        if(this.vl_Satisfacao != undefined){
            this.Selecionar_Satisfacao(this.vl_Satisfacao)
        }
    }

    Selecionar_Satisfacao(vl_Satisfacao) {


        this.numeros.map(nr => {
            nr.b_Selecionado = false;

            nr.style = "div-SatisfDesignGrey";
        })

        this.numeros.filter(x => x.nm == vl_Satisfacao).map(nr => {
            nr.b_Selecionado = true;

            if (vl_Satisfacao == 1){
                nr.style = "div-SatisfDesignVerm"
            } else if (vl_Satisfacao == 2){
                nr.style = "div-SatisfDesignLarj"
            } else if (vl_Satisfacao == 3){
                nr.style = "div-SatisfDesignAm"
            } else if (vl_Satisfacao == 4){
                nr.style = "div-SatisfDesignVdCla"
            } else if (vl_Satisfacao == 5){
                nr.style = "div-SatisfDesignVdEsc"
            }

        })

        this.On_Select.emit(vl_Satisfacao)
    }

}
