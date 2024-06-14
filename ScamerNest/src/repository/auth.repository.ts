
import { HttpService } from '@nestjs/axios';
import { Injectable } from "@nestjs/common";
import { Resposta } from 'src/models/resposta.entity';
import { ApiGenericService } from 'src/services/generic.service';

@Injectable()
export class AuthRepository {

    constructor(
        private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService,
    ) { }

    async Login(ds_Login: string, ds_Senha: string){
        try {
            const response = await this.httpService.post(process.env.BASE_API_PESQUISA + `V1/Auth/${ds_Login}/${ds_Senha}`, this.apiService.objConfig_Pesquisa).toPromise()

            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro_Generic(error?.response);
        }
    }

}