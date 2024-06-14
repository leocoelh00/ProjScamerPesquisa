import { PesquisaQuery } from './../queries/pesquisa.query';
import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";
import { SubjectService } from "../services/subject.service";
import { PesquisaListagem } from '../models/pesquisa/pesquisa-listagem';
import { Resposta } from '../models/resposta/resposta.model';
import { PerguntaInput } from '../models/pesquisa/avaliacao-pergunta-params';
import { Pesquisa } from '../models/pesquisa/pesquisa';
import { PesquisaUsuarioInput } from '../models/pesquisa/pesquisa-usuario-input';
import { FinalizarPesquisaParams } from '../models/pesquisa/finalizar-pesquisa-params';
import { Media } from '../models/pesquisa/media';


@Injectable({
    providedIn: 'root'
})
export class PesquisaRepository{
    httpOptions: any

    constructor(
        private apiService: ApiService,
        private subjectService: SubjectService,
        private PesquisaQuery: PesquisaQuery
    ){}

    async Get_Pesquisa(cd_Usuario_Pesquisa: number): Promise<Resposta<Pesquisa>>{
        this.subjectService.subject_Exibindo_Loading.next(true);
        const query = this.PesquisaQuery.Get_Pesquisa()

        const response = await this.apiService.Query([query], {cd_Usuario_Pesquisa}, this.httpOptions)
        this.subjectService.subject_Exibindo_Loading.next(false);

        return response.pesquisa
    }

    async Get_Media(): Promise<Resposta<Media>>{
        this.subjectService.subject_Exibindo_Loading.next(true);
        const query = this.PesquisaQuery.Get_Media()

        const response = await this.apiService.Query([query], null, this.httpOptions)
        this.subjectService.subject_Exibindo_Loading.next(false);

        return response.media
    }

    async Set_Incluir_Avaliacao_Pergunta(params: PerguntaInput): Promise<Resposta<any>>{
        this.subjectService.subject_Exibindo_Loading.next(true);
        const query = this.PesquisaQuery.Set_Incluir_Avaliacao_Pergunta()

        const response = await this.apiService.Mutation([query], {params}, this.httpOptions)
        this.subjectService.subject_Exibindo_Loading.next(false);
        return response
    }

    async Set_Finalizar_Pesquisa(params: FinalizarPesquisaParams): Promise<Resposta<any>>{
        this.subjectService.subject_Exibindo_Loading.next(true);
        const query = this.PesquisaQuery.Set_Finalizar_Pesquisa()


        const response = await this.apiService.Mutation([query], {params}, this.httpOptions)
        this.subjectService.subject_Exibindo_Loading.next(false);

        return response
    }

}