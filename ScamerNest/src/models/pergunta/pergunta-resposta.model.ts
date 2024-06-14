import { Field, ObjectType } from '@nestjs/graphql';
import { RespostaQuery } from '../resposta.entity';

@ObjectType()
export class Pergunta{
    @Field()
    cd_Pergunta: number

    @Field()
    ds_Pergunta: string
}

@ObjectType()
export class PerguntaListagem extends RespostaQuery(Pergunta){}