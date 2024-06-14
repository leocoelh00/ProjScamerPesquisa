import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-escala',
    templateUrl: './escala.component.html',
    styleUrls: ['./escala.component.scss']
})
export class EscalaComponent implements OnInit {
    @Output() On_Select = new EventEmitter()
    @Input() vl_Satisfacao: number

    numeros: any = [{ nm: "1", style: "div-SatisfDesignVerm" }, { nm: "2", style: "div-SatisfDesignVerm" }, { nm: "3", style: "div-SatisfDesignVerm" }, { nm: "4", style: "div-SatisfDesignVerm" }, { nm: "5", style: "div-SatisfDesignVerm" }, { nm: "6", style: "div-SatisfDesignVerm" }, { nm: "7", style: "div-SatisfDesignAm" }, { nm: "8", style: "div-SatisfDesignAm" }, { nm: "9", style: "div-SatisfDesignVd" }, { nm: "10", style: "div-SatisfDesignVd" }]
    objPayload: any = {}

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        if(this.vl_Satisfacao != 0){

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

            if (vl_Satisfacao <= 6) {
                nr.style = "div-SatisfDesignVerm";
            } else if (vl_Satisfacao <= 8) {
                nr.style = "div-SatisfDesignAm";
            } else {
                nr.style = "div-SatisfDesignVd";
            }
        })

        this.On_Select.emit(vl_Satisfacao)
    }

}
