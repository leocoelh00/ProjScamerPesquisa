import { AuthRepository } from './../repository/auth.repository';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { Resposta, RespostaGeneric, RespostaQuery } from "src/models/resposta.entity";
import { LoginResposta } from 'src/models/login/login-resposta';

@Injectable()
export class AuthService {
    constructor(
        private AuthRepository: AuthRepository
    ){}
   
    async Login(ds_Login: string, ds_Senha: string){
        let resposta = new Resposta<LoginResposta>();

        const response = await this.AuthRepository.Login(ds_Login, ds_Senha);
        
        if (response.status) {
            
            resposta.data = response.data 
            
        } else {

            resposta = response
        }

        return resposta;
    }
}