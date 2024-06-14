import { Injectable } from '@angular/core';
import { LoginParams } from "../models/login/login-params.model";
import { QueryModel } from '../models/query/query.model';


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() {
  }

  /**
   * @description Query de Login
   * @param {LoginParams} params
   * @return {*}  {string}
   */
  Set_Mutation_Login(): QueryModel {
    return {
      header: [
        {
          field: "$params",
          type: "LoginInput!"
        }
      ],
      query: `
        login(params: $params) {
            status
            data {
              cd_Usuario
              ds_Access_Token
              nm_Usuario
              objArrayPermissoes{
                cd_Acao
                cd_Rotina
              }
            }
            motivos_Critica{
              propriedade
              criticas
            }
            statusCode
          }
        `
    };
  }
}
