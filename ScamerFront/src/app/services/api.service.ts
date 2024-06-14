import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DataService } from "./data.service";
import { QueryModel } from "../models/query/query.model";
import { Apollo, gql } from "apollo-angular";
import { Copy } from "../utils/utils";
import packageInfo from '../../../package.json';

@Injectable({
    providedIn: "root"
})
export class ApiService {
    httpOptions = {};

    constructor(private http: HttpClient, private data: DataService,
        private apollo: Apollo
    ) {
        this.Preparar_HttpOptions();
    }

    Preparar_HttpOptions(objHeaders = null) {
        let token = this.data.Get_Session_Token();

        if (objHeaders == null) {
            objHeaders = {
                "X-Source": "PESQUISA",
                "X-Version": packageInfo.version
            };
        }

        let headersCustom = new HttpHeaders(objHeaders)
            .append("Authorization", "Bearer " + token);

        this.httpOptions = {
            headers: headersCustom
        };
    }

    /**
    * @description Executa uma ou várias consultas GraphQL
     * @deprecated Utilizar Query
    * @param querys Array de strings com as querys GraphQL
    * @param objHeaders Objeto de headers HTTP
    */
    _Query(querys: string[], objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = {
            query: "query { " + querys.join(" \r\n") + " }",
            variables: null
        };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_APIBASE +
                environment.CONS_URL_GRAPH_ENDPOINT,
                objBody,
                this.httpOptions
            )
            .toPromise();

    }

    /**
     * @description Executa uma consulta GraphQL
     * @deprecated Utilizar Mutation
     * @param strMutation
     * @param objHeaders
     */
    _Mutation(strMutation: string, objHeaders: any = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = { query: `mutation { ${strMutation} }` };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_APIBASE +
                environment.CONS_URL_GRAPH_ENDPOINT,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    /**
     * @description Executa uma ou várias consultas GraphQL
     * @param querys Array de strings com as querys GraphQL
     * @param objHeaders Objeto de headers HTTP
     */
    async Query(querys: QueryModel[], objVariables: any, objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);
        let ds_Header = "query"
        if (querys.some(element => element.header != null && element.header.length > 0)) {
            ds_Header += "("

            const objArrayQuery = []

            for (let query of querys) {
                for (let header of query.header) {
                    if (!objArrayQuery.some(element => element.field == header.field))
                        objArrayQuery.push(header)
                }
            }

            ds_Header += objArrayQuery.map(element => element.field + ":" + element.type).join(" ")
            ds_Header += ")"
        }

        const query = querys.map(element => element.query).join(" \r\n")

        // Retorna o promise
        return Copy(
            (await this.apollo.query({ query: gql`${ds_Header} {${query}}`, variables: objVariables })
                .toPromise()).data
        );

    }

    /**
     * @description Mutation
     * @param {QueryModel[]} mutations
     * @param {*} objVariables
     * @param {*} [objHeaders=null]
     * @return {*}
     */
    async Mutation(mutations: QueryModel[], objVariables: any, objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);
        let ds_Header = "mutation"

        if (mutations.some(element => element.header)) {
            ds_Header += "("

            const objArrayQuery = []

            for (let query of mutations) {
                for (let header of query.header) {
                    if (!objArrayQuery.some(element => element.field == header.field))
                        objArrayQuery.push(header)
                }
            }

            ds_Header += objArrayQuery.map(element => element.field + ":" + element.type).join(" ")
            ds_Header += ")"
        }

        const query = mutations.map(element => element.query).join(" \r\n")

        // Retorna o promise
        return Copy(
            (await this.apollo.mutate({ mutation: gql`${ds_Header} {${query}}`, variables: objVariables })
                .toPromise()).data
        );

    }

    VariablesMutation(strMutation: string, objHeaders: any = null, objVariables = {}, header: string) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = { query: `mutation ${header} { ${strMutation} }`, variables: objVariables };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_APIBASE +
                environment.CONS_URL_GRAPH_ENDPOINT,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    /**
     * Executa uma ou várias consultas GraphQL
     * @param querys Array de strings com as querys GraphQL
     * @param objHeaders Objeto de headers HTTP
     */
    async Execute_Querys(querys: string[], objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = {
            query: "query { " + querys.join(" \r\n") + " }",
            variables: null
        };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_APIBASE +
                environment.CONS_URL_GRAPH_ENDPOINT,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    Enviar_Arquivos(files, objHeaders = null): Promise<any> {
        this.Preparar_HttpOptions(objHeaders);

        //const formData = new FormData();
        const formData: any = new FormData();
        //formData.append('test', file, files[0].filename);

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i], files[i]['name']);
        }

        // Retorna o promise
        return this.http
            .post(
                environment.CONS_URL_APIBASE + "upload/file",
                formData,
                this.httpOptions
            )
            .toPromise();
    }
}
