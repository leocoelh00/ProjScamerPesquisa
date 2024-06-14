import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { SubjectService } from "./subject.service";
import { UsuariosQuery } from "../queries/usuarios.query";
import { Usuarios } from "../models/usuarios/usuarios.model";
import { UsuariosParams } from "../models/usuarios/usuarios.params";
import { Resposta } from "../models/resposta/resposta.model";

@Injectable({
    providedIn: "root"
})
export class UsuariosRepository {

    /** @description Options da Requisição */
    httpOptions: any

    constructor(private apiService: ApiService,
        private usuariosQuery: UsuariosQuery,
        private subjectService: SubjectService,
    ) {
    }

    async Get_Usuario(cd_Usuario: number): Promise<Usuarios> {
        this.subjectService.subject_Exibindo_Loading.next(true)

        const query = this.usuariosQuery.Get_Usuario()
        const response = await this.apiService.Query([query], { cd_Usuario }, this.httpOptions)

        this.subjectService.subject_Exibindo_Loading.next(false)

        
        return response.usuario.data
    }

    async Get_Usuarios(params: UsuariosParams): Promise<Resposta<Usuarios[]>> {
        this.subjectService.subject_Exibindo_Loading.next(true)

        const query = this.usuariosQuery.Get_Usuarios()
        const response = await this.apiService.Query([query], { params }, this.httpOptions)

        this.subjectService.subject_Exibindo_Loading.next(false)

        return response.usuarios
    }

    async Set_Incluir_Usuario(params: Usuarios): Promise<any> {
        this.subjectService.subject_Exibindo_Loading.next(true)

        const query = this.usuariosQuery.Set_Incluir_Usuario()
        const response = await this.apiService.Mutation([query], { params }, this.httpOptions)

        this.subjectService.subject_Exibindo_Loading.next(false)

        return response.incluir_usuario
    }

    async Set_Alterar_Usuario(params: Usuarios): Promise<any> {
        this.subjectService.subject_Exibindo_Loading.next(true)

        const query = this.usuariosQuery.Set_Alterar_Usuario()
        const response = await this.apiService.Mutation([query], { params }, this.httpOptions)

        this.subjectService.subject_Exibindo_Loading.next(false)

        return response.alterar_usuario
    }

}
