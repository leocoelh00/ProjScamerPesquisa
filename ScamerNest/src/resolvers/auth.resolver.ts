import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Login, LoginResposta } from "src/models/login/login-resposta";
import { Resposta, RespostaGeneric, RespostaQuery } from "src/models/resposta.entity";
import { AuthService } from "src/services/auth.service";

@Resolver(of => Resposta)
export class AuthResolver {

    constructor(
        private authService: AuthService
    ) { }

    @Query(type => LoginResposta, { name: "login" })
    async Login(@Args('ds_Login') ds_Login: string,
                @Args('ds_Senha') ds_Senha: string) {
        return await this.authService.Login(ds_Login, ds_Senha) ;
    }

}