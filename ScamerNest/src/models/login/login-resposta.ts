import { Field, ObjectType } from '@nestjs/graphql';
import { RespostaQuery } from '../resposta.entity';

@ObjectType()
export class Login{
    @Field({nullable: true})
    sn_Login: boolean
}

@ObjectType()
export class LoginResposta extends RespostaQuery(Login){}
