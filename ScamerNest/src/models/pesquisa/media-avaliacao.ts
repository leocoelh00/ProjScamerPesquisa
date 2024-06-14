import { Field, ObjectType } from "@nestjs/graphql";
import { RespostaQuery } from "../resposta.entity";


@ObjectType()
export class MediaAvaliacao{

    @Field({nullable: true})
    nr_Media_Avaliacao: number
}

@ObjectType()
export class Media extends RespostaQuery(MediaAvaliacao){}