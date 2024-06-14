import { Injectable } from "@nestjs/common";
import { PerguntaInput } from "src/models/pergunta/pergunta-input.model";
import { PesquisaListagemResposta } from "src/models/pesquisa/pesquisa-listagem-resposta.model";
import { PesquisaResposta } from "src/models/pesquisa/pesquisa-resposta.model";
import { Resposta } from "src/models/resposta.entity";
import { PesquisaRepository } from "src/repository/pesquisa.repository";
import { MediaAvaliacao } from "src/models/pesquisa/media-avaliacao";





@Injectable()
export class PesquisaService {
    constructor(
        private PesquisaRepository: PesquisaRepository
    ) { }


    async Get_Pesquisa(cd_Usuario_Pesquisa: number) {
        let resposta = new Resposta<PesquisaResposta>();

        const response = await this.PesquisaRepository.Get_Pesquisa(cd_Usuario_Pesquisa)

        if (response.status) {
            resposta.data = response.data
        } else {
            resposta = response
        }

        return resposta;
    }

    async Get_Media(){
        let resposta = new Resposta<MediaAvaliacao>();

        const response = await this.PesquisaRepository.Get_Media()

        if(response.status){
            resposta.data = response.data
        } else {
            resposta = response
        }
        return resposta;
    }

    async Set_Incluir_Avaliacao_Pergunta(params: PerguntaInput) {
        let resposta = new Resposta<any>()

        const response = await this.PesquisaRepository.Set_Incluir_Avaliacao_Pergunta(params);

        if (response.status) {
            resposta.data = response.data
        } else {
            resposta = response
        }
        return resposta;
    }


}
