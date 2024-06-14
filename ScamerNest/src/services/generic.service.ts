import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { Resposta, RespostaGeneric } from "src/models/resposta.entity";

@Injectable()
export class ApiGenericService {

    constructor() {}

    objConfig_Pesquisa: any = {};

    Tratar_Erro(error: any) {
        if (error) {
            switch (error.response.status) {
                case 401:
                    throw new HttpException(new Resposta().Tratar_Erro("Rota não autorizada para o usuário", 401) as any, HttpStatus.UNAUTHORIZED);
                case 400:
                    if (error.response.data.statusCode == 200) {
                        return error.response.data
                    } else {
                        throw new HttpException(error.data, HttpStatus.BAD_REQUEST);
                    }
                default:
                    throw new HttpException(new Resposta().Tratar_Erro("Ocorreu um erro inesperado na Api. ERR:" + error.message) as any, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException(new Resposta().Tratar_Erro("Ocorreu um erro inesperado na Api") as any, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    Tratar_Erro_Generic(error: any) {
        if (error) {
            switch (error.response.status) {
                case 401:
                    throw new HttpException(new RespostaGeneric().Tratar_Erro_Generic("Rota não autorizada para o usuário", 401) as any, HttpStatus.UNAUTHORIZED);
                case 400:
                    if (error.response.data.statusCode == 200) {
                        return error.response.data
                    } else {
                        throw new HttpException(error.data, HttpStatus.BAD_REQUEST);
                    }
                default:
                    throw new HttpException(new RespostaGeneric().Tratar_Erro_Generic("Ocorreu um erro inesperado na Api. ERR:" + error.message) as any, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException(new RespostaGeneric().Tratar_Erro_Generic("Ocorreu um erro inesperado na Api") as any, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    Tratar_Erro_Arquivo(err) {
        throw new HttpException(err.message, HttpStatus.TEMPORARY_REDIRECT);
    }
}