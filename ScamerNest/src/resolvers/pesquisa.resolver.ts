import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PerguntaInput } from "src/models/pergunta/pergunta-input.model";
import { PesquisaListagemResposta } from "src/models/pesquisa/pesquisa-listagem-resposta.model";
import { PesquisaResposta } from "src/models/pesquisa/pesquisa-resposta.model";
import { Resposta } from "src/models/resposta.entity";
import { PesquisaService } from "../services/pesquisa.service";
import { Media } from "src/models/pesquisa/media-avaliacao";


@Resolver(of => Resposta)
export class PesquisaResolver {
    constructor(
        private pesquisaService: PesquisaService,
    ) { }

    @Query(type => PesquisaResposta, { name: "pesquisa" })
    async Get_Pesquisa(
        @Args('cd_Usuario_Pesquisa') cd_Usuario_Pesquisa: number
    ) {
        return await this.pesquisaService.Get_Pesquisa(cd_Usuario_Pesquisa);
    }

    @Query(type => Media, {name: "media"})
    async Get_Media(){
        return await this.pesquisaService.Get_Media();
    }

    @Mutation(type => Resposta, { name: "incluir_avaliacao_pergunta" })
    async Set_Incluir_Avaliacao_Pergunta(
        @Args('params') params: PerguntaInput
        ) {
        return await this.pesquisaService.Set_Incluir_Avaliacao_Pergunta(params);
    }

}