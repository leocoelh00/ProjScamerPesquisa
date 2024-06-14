import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PerguntaInput{
    @Field({nullable: true})
    cd_Pergunta: number

    @Field({nullable: true})
    cd_Usuario_Pesquisa: number

    @Field({nullable: true})
    nr_Resposta: number

}