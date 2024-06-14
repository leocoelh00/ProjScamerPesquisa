import { Field, ObjectType } from '@nestjs/graphql';
import { RespostaListagemQuery } from '../resposta.entity';

@ObjectType()
export class PesquisaListagem{
    @Field({nullable: true})
    cd_Usuario_Pesquisa: number

    @Field({nullable: true})
    ds_Pesquisa: string

    @Field({nullable: true})
    nm_Usuario: string

    @Field({nullable: true})
    ds_SubTitulo: string
}

@ObjectType()
export class PesquisaListagemResposta extends RespostaListagemQuery(PesquisaListagem){}
