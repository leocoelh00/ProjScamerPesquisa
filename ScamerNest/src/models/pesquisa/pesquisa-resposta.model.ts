import { Field, ObjectType } from "@nestjs/graphql";
import { RespostaQuery } from "../resposta.entity";


@ObjectType()
export class Pesquisa{

    @Field({nullable: true})
    cd_Pergunta: number

    @Field({nullable: true})
    ds_Pergunta: string

    @Field({nullable: true})
    tp_Pesquisa: number
}

@ObjectType()
export class PesquisaResposta extends RespostaQuery(Pesquisa){}