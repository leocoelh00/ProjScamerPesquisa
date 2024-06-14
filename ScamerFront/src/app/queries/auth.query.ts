import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthQuery {

    constructor() { }

    Login(){
        return {
            header: [{
                field: '$ds_Login',
                type: 'String!'
            },{
                field: '$ds_Senha',
                type:'String!'
            }],
                query: `login(ds_Login: $ds_Login, ds_Senha: $ds_Senha){
                    data{
                        sn_Login
                    }
                    motivos_Critica{
                        criticas
                        propriedade
                    }
                    status
                }`,
        }
    }
}