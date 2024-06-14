import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Login } from "../models/login/login.model";

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor() { }

    // Valores para armazenar em memória
    strStorageSessionName = environment.SESSION_NAME;

    Destroy_Data() {
    }


    Set_Login(strLogin) {
        localStorage.setItem(`${this.strStorageSessionName}-login`, strLogin);
    }

    Get_Login() {
        let data = localStorage.getItem(`${this.strStorageSessionName}-login`);

        if (data) {
            return data;
        } else {
            return "";
        }
    }

    /**
     * Grava em localStorage os dados
     * @param objData Dados do usuário logado
     */
    Set_Session(objData: Login) {
        sessionStorage.setItem(this.strStorageSessionName, JSON.stringify(objData));
    }

    Set_Session_Dado(objData) {
        sessionStorage.setItem(this.strStorageSessionName, JSON.stringify(objData));
    }

    /**
     * Captura os dados da sessão
     */
    Get_Session_Token(): string {
        var data: Login = JSON.parse(
            sessionStorage.getItem(this.strStorageSessionName)
        );

        return data?.ds_Access_Token;
    }

    Get_Session(): any {
        var data: Login = JSON.parse(
            sessionStorage.getItem(this.strStorageSessionName)
        );

        return data;
    }

    Limpar_Session() {
        this.Destroy_Data();
        sessionStorage.removeItem(this.strStorageSessionName);
    }

    Set_Dados(strNomePagina, objData) {

        let session = JSON.parse(sessionStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (session) {
            session[strNomePagina] = objData;
            sessionStorage.setItem(`${this.strStorageSessionName}-tmp`, JSON.stringify(session));
        } else {
            let objTmp = {};
            objTmp[strNomePagina] = objData;
            sessionStorage.setItem(`${this.strStorageSessionName}-tmp`, JSON.stringify(objTmp));
        }

    }

    Get_Dados_Campo(strNomePagina, strNomeCampo) {

        let session = JSON.parse(sessionStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (session) {

            if (session[strNomePagina] != undefined) {
                if (session[strNomePagina][strNomeCampo] != undefined) {
                    return session[strNomePagina][strNomeCampo];
                } else {
                    return null;
                }
            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    Get_Dados(strNomePagina) {

        let session = JSON.parse(sessionStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (session) {

            if (session[strNomePagina] != undefined) {

                return session[strNomePagina];

            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    Clear_Dados_Campo() {
        sessionStorage.removeItem(`${this.strStorageSessionName}-tmp`);
    }

    Set_Dados_Local(strNomePagina, objData) {
        let local = JSON.parse(localStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (local) {
            local[strNomePagina] = objData;
            localStorage.setItem(`${this.strStorageSessionName}-tmp`, JSON.stringify(local));
        } else {
            let objTmp = {};
            objTmp[strNomePagina] = objData;
            localStorage.setItem(`${this.strStorageSessionName}-tmp`, JSON.stringify(objTmp));
        }
    }

    Get_Dados_Local(strNomePagina) {

        let local = JSON.parse(localStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (local) {

            if (local[strNomePagina] != undefined) {

                return local[strNomePagina];

            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    Get_Dados_Campo_Local(strNomePagina, strNomeCampo) {

        let local = JSON.parse(localStorage.getItem(`${this.strStorageSessionName}-tmp`));

        if (local) {

            if (local[strNomePagina] != undefined) {
                if (local[strNomePagina][strNomeCampo] != undefined) {
                    return local[strNomePagina][strNomeCampo];
                } else {
                    return null;
                }
            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    Clear_Dados_Campo_Local() {
        localStorage.removeItem(`${this.strStorageSessionName}-tmp`);
    }

}
