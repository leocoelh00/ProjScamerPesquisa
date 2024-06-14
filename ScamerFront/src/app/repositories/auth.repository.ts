import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";
import { SubjectService } from "../services/subject.service";
import { Resposta } from "../models/resposta/resposta.model";
import { AuthQuery } from "../queries/auth.query";
import { LoginRetorno } from "../models/pesquisa/loginRetorno";

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
    httpOptions: any

    constructor(
        private apiService: ApiService,
        private subjectService: SubjectService,
        private authQuery: AuthQuery
    ){}

    async Login(ds_Login: string, ds_Senha: string): Promise<Resposta<LoginRetorno>>{
        this.subjectService.subject_Exibindo_Loading.next(true);
        const query = this.authQuery.Login()

        const response = await this.apiService.Query([query], {ds_Login, ds_Senha}, this.httpOptions)

        this.subjectService.subject_Exibindo_Loading.next(false);

        return response.login
    }
}