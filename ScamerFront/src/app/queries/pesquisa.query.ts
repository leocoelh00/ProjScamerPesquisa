import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PesquisaQuery {
    constructor() { }

    Get_Pesquisa() {
        return {
            header: [{
                field: '$cd_Usuario_Pesquisa',
                type: 'Float!',
            }],
            query: ` pesquisa(cd_Usuario_Pesquisa: $cd_Usuario_Pesquisa){
                data{
                     cd_Pergunta,
                     ds_Pergunta,
                     tp_Pesquisa
                    }
                motivos_Critica{
                                criticas,
                                propriedade
                               }
                status
                }`,
        }
    }

    Get_Media(){
        return{
            header:[],
            query: `media{
                data{
                    nr_Media_Avaliacao
                }
                motivos_Critica{
                    criticas,
                    propriedade
                }
                status
            }`,
        }
    }

    Set_Incluir_Avaliacao_Pergunta() {
        return {
            header: [{
                field: '$params',
                type: 'PerguntaInput!'
            }],
            query: `incluir_avaliacao_pergunta(params: $params){
                motivos_Critica{
                  criticas,
                  propriedade
                }
                status
              }`,
        }
    }

    Set_Finalizar_Pesquisa() {
        return {
            header: [{
                field: '$params',
                type: 'FinalizarPesquisaInput!',
            }],
            query: `finalizar_pesquisa(params: $params){
                data
                motivos_Critica{criticas,propriedade}
              }`,
        }
    }


}