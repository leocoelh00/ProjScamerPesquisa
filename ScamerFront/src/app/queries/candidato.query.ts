import { Injectable } from "@angular/core";
import { QueryModel } from "../models/query/query.model";

@Injectable({
    providedIn: 'root',
})
export class CandidatoQuery {
    constructor() { }

    Get_Candidato() {
        return {
            header: [{
                field: '$cd_Chave_Inscricao',
                type: 'Float!',
            },
            ],
            query: `candidato(cd_Chave_Inscricao: $cd_Chave_Inscricao){
                data {
                    cd_Candidato
                    cd_Chave_Inscricao
                    cd_Status
                    nm_Status
                    nm_Medico_Indicado
                    nr_CRM
                    nr_CPF
                    ds_Especialidade
                    dt_Inscricao
                    nr_CEP
                    ds_Endereco
                    nr_Endereco
                    nm_Bairro
                    nm_Cidade
                    UF
                }
                status
                motivos_Critica {criticas}
                statusCode
            }`,
        }
    }

    Get_Candidato_Parecer() {
        return {
            header: [{
                field: '$cd_Chave_Inscricao',
                type: 'Float!',
            },
            ],
            query: `candidato_parecer(cd_Chave_Inscricao: $cd_Chave_Inscricao){
                data {
                    cd_Parecer
                    tp_Resultado
                    ds_Parecer
                    cd_Usuario
                    dh_Parecer
                    tp_Parecer
                    nm_Tipo_Parecer
                }
                status
                motivos_Critica {criticas}
                statusCode
            }`,
        }
    }

    Get_Candidato_Anexo() {
        return {
            header: [{
                field: '$cd_Chave_Inscricao',
                type: 'Float!',
            },
            ],
            query: `candidato_anexos(cd_Chave_Inscricao: $cd_Chave_Inscricao){
            data{
                cd_Candidato_Documento_Anexo
                nm_Documento
                sn_Aprovado
            }
            status
            motivos_Critica {criticas}
            statusCode
        }`
        }
    }

    Get_Candidato_Termo() {
        return {
            header: [{
                field: '$cd_Chave_Inscricao, $cd_Campanha',
                type: 'Float!',
            },
            ],
            query: `candidato_termos(
                cd_Chave_Inscricao: $cd_Chave_Inscricao,
                cd_Campanha: $cd_Campanha
                ){
            data{
                cd_Candidato_Documento_Leitura
                nm_Documento
                dh_Leitura
                sn_Leitura
            }
            status
            motivos_Critica {criticas}
            statusCode
        }`
        }
    }

    Get_Documento_Token() {

        return {
            header: [{
                field: '$params',
                type: 'DocumentoTokenParams!'
            }],
            query: `
                documento_token(params: $params) {
                    data {
                      ds_Token
                    }
                    status
                    motivos_Critica {criticas}
                    statusCode
                  }
                `
        }
    }

    Set_Reprovar_Anexo(): QueryModel {
        return {
            header: [
                {
                    field: '$params',
                    type: 'CandidatoAnexoInput!',
                },
            ],
            query: `
            reprovar_anexos(params: $params){
                        motivos_Critica {criticas}
                        status
                        data
                    }
                `,
        };
    }

    Set_Aprovar_Anexo(): QueryModel {
        return {
            header: [
                {
                    field: '$params',
                    type: 'CandidatoAnexoInput!',
                },
            ],
            query: `
            aprovar_anexos(params: $params){
                        motivos_Critica {criticas}
                        status
                        data
                    }
                `,
        };
    }

    Set_Candidato_Devolver(): QueryModel {
        return {
            header: [
                {
                    field:'$params',
                    type: 'CandidatoDevolucaoInput!'
                },
            ],
            query: `
            candidato_devolver(params: $params){
                data
                motivos_Critica {criticas}
                status
              }
            `
        }
    }

    Set_Aprovar_Candidato() {
        return {
            header: [{
                field: '$cd_Chave_Inscricao',
                type: 'Float!'
            }],
            query: `
            aprovar_campanha(cd_Chave_Inscricao: $cd_Chave_Inscricao) {
                    data
                    status
                    motivos_Critica {criticas}
                    statusCode
                  }
                `
        }
    }
}