
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FinalizarPesquisaInput{
    @Field({nullable: true})
    cd_Usuario_Pesquisa: number

    @Field({nullable: true})
    tp_Origem: string
}