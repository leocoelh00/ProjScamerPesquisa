/**
   * @description Mostra as mensagens de acordo com o erro que é dado
   * @static
   * @param {string} fieldName Nome do Campo
   * @param {string} validatorName Nome da Validação
   * @param {*} [validatorValue] Valor da Validação
   * @returns
   */

import { Injectable } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { Split_By_String } from "../utils";

@Injectable({
    providedIn: "root"
})

export class CustomValidators {

    constructor() {
    }

    getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `Obrigatório.`,
            'bloqueado': 'Código bloqueado para alteração',
            'cpfInvalido': "CPF inválido",
            'cnpjInvalido': "CNPJ inválido",
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'pattern': 'Campo inválido',
            'email': 'Email inválido',
            "senhaDivergente": "As senhas estão divergentes!",
            "mensagem": validatorValue,
        };

        return config[validatorName];
    }

    static validatorEmail(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;

            for (let aux of Split_By_String(control.value, ";,")) {
                if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(aux)) {
                    continue;
                } else {
                    return { pattern: true }
                }
            }

            return null;
        }
    }

    static validatorCPF(cpfZerado?: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value || !control.value.replace(/[^\d]+/g, '')) {
                return null;
            }
            let cpf = control.value.replace(/[^\d]+/g, '');
            if (cpfZerado && cpf == '00000000000') {
                return null;
            }
            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 ||
                cpf == '00000000000' ||
                cpf == '11111111111' ||
                cpf == '22222222222' ||
                cpf == '33333333333' ||
                cpf == '44444444444' ||
                cpf == '55555555555' ||
                cpf == '66666666666' ||
                cpf == '77777777777' ||
                cpf == '88888888888' ||
                cpf == '99999999999') {
                return { cpfInvalido: true };
            }
            // Valida 1o digito
            let add = 0;
            for (let i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) {
                rev = 0;
            }
            if (rev != parseInt(cpf.charAt(9))) {
                return { cpfInvalido: true };
            }
            // Valida 2o digito
            add = 0;
            for (let i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i)) * (11 - i);
            }
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) {
                rev = 0;
            }
            if (rev != parseInt(cpf.charAt(10))) {
                return { cpfInvalido: true };
            }
            return null;
        };
    }

}