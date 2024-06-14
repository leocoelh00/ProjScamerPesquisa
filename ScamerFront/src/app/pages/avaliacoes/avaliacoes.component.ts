import { Component, OnInit } from '@angular/core';
import { PesquisaService } from 'src/app/services/pesquisa.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

nr_Media_Avaliacao: number
ds_Button: string = "assets/images/exit.svg"
nm_Rota: string = "/login"
color: string



  constructor(
    private pesquisaService: PesquisaService
  ) { }

  ngOnInit(): void {

    this.pesquisaService.Get_Media_Avaliacao().then(res => {

        if (res.status){
            this.nr_Media_Avaliacao = res.data.nr_Media_Avaliacao

            if(res.data.nr_Media_Avaliacao < 5){
                this.color = "AvaliacaoVermelha"
            }
            else if (res.data.nr_Media_Avaliacao < 8){
                this.color = "AvaliacaoAmarela"
            }
            else {
                this.color = "AvaliacaoVerde"
            }
        }
    })
  }

}
