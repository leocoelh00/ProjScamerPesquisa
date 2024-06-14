import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PerguntaInput } from 'src/models/pergunta/pergunta-input.model';
import { FinalizarPesquisaInput } from 'src/models/pesquisa/finalizar-pesquisa-input';
import { ApiGenericService } from 'src/services/generic.service';


@Injectable()
export class PesquisaRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService
    ) { }


    async Get_Pesquisa(cd_Usuario_Pesquisa: number) {
        try {
            const response = await this.httpService.get(process.env.BASE_API_PESQUISA + `V1/Pesquisa/${cd_Usuario_Pesquisa}`, this.apiService.objConfig_Pesquisa).toPromise()

            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }

    async Get_Media(){
        try{
            const response = await this.httpService.get(process.env.BASE_API_PESQUISA + `V1/Pesquisa/Media/Avaliacoes`, this.apiService.objConfig_Pesquisa).toPromise()
           
            return response.data
        } catch (error){
            return this.apiService.Tratar_Erro(error?.response);
        }
    }
    async Set_Incluir_Avaliacao_Pergunta(params: PerguntaInput) {
        try {
            const response = await this.httpService.put(process.env.BASE_API_PESQUISA + `V1/Pesquisa/Avaliacao`, params, this.apiService.objConfig_Pesquisa).toPromise()
            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }

}
