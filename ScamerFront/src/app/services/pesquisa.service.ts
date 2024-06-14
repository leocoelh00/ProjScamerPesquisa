import { PesquisaRepository } from './../repositories/pesquisa.repository';
import { PesquisaQuery } from './../queries/pesquisa.query';
import { SubjectService } from 'src/app/services/subject.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resposta } from '../models/resposta/resposta.model';
import { PesquisaListagem } from '../models/pesquisa/pesquisa-listagem';
import { PerguntaInput } from '../models/pesquisa/avaliacao-pergunta-params';
import { PesquisaUsuarioInput } from '../models/pesquisa/pesquisa-usuario-input';
import { FinalizarPesquisaParams } from '../models/pesquisa/finalizar-pesquisa-params';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
    httpOptions: any

  constructor(
    private PesquisaRepository: PesquisaRepository
    ) { }

    Get_Pesquisa(cd_Usuario_Pesquisa: number){
        return this.PesquisaRepository.Get_Pesquisa(cd_Usuario_Pesquisa)
    }

    Set_Incluir_Avaliacao_Pergunta(objPergunta: PerguntaInput){
        return this.PesquisaRepository.Set_Incluir_Avaliacao_Pergunta(objPergunta)
    }

    Get_Media_Avaliacao(){
        return this.PesquisaRepository.Get_Media()
    }

    Set_Finalizar_Pesquisa(objFinalizarPesquisa: FinalizarPesquisaParams){

        return this.PesquisaRepository.Set_Finalizar_Pesquisa(objFinalizarPesquisa);
    }

}
