import {Injectable} from '@angular/core';
import {QueryModel} from '../models/query/query.model';

@Injectable({
    providedIn: 'root'
})
export class AcessoQuery {

    constructor() {
    }

    Get_Perfil(): QueryModel {
        return {
            header: [
                {field: "$cd_Perfil", type: "Float!"},
            ],
            query: `
            perfil(cd_Perfil: $cd_Perfil) {
              data {
                acoes_selecionadas {
                  cd_Acao
                  cd_Rotina
                  cd_Perfil
                }
                cd_Perfil
                nm_Perfil
              }
              motivos_Critica {
                criticas
                propriedade
              }
              status
              statusCode
            }
        `
        };
    }

    Get_Rotinas(): QueryModel{
        return {
            header: [],
            query: `
                rotinas {
                  data {
                    acoes {
                      cd_Acao
                      cd_Perfil
                      cd_Rotina
                      nm_Acao
                    }
                    cd_Rotina
                    nm_Rotina
                  }
                  motivos_Critica {
                    criticas
                    propriedade
                  }
                  status
                  statusCode
                }
            `
        }
    }

    Get_Perfis(): QueryModel {
        return {
            header: [
                          ],
            query: `
            perfis {
              data {
                cd_Perfil
                nm_Perfil
              }
              motivos_Critica {
                criticas
                propriedade
              }
              status
              statusCode
            }
        `
        };
    }

    Set_Alterar_Perfil(): QueryModel {
        return {
            header: [
                {
                    field: "$params",
                    type: "[AlterarPerfilInput!]!"
                }
            ],
            query: `
            alterar_perfil(params: $params) {
              data
              motivos_Critica {
                criticas
                propriedade
              }
              status
              statusCode
            }
        `
        };
    }

    Set_Alterar_Nome_Perfil(): QueryModel {
        return {
            header: [
                {
                    field: "$params",
                    type: "PerfilInput!"
                }
            ],
            query: `
            alterar_nome_perfil(params: $params) {
              data
              motivos_Critica {
                criticas
                propriedade
              }
              status
              statusCode
            }
        `
        };
    }

    Set_Incluir_Perfil(): QueryModel {
        return {
            header: [
                {
                    field: "$params",
                    type: "PerfilInput!"
                }
            ],
            query: `
            incluir_perfil(params: $params) {
              data
              motivos_Critica {
                criticas
                propriedade
              }
              status
              statusCode
            }
        `
        };
    }

}
