import { FormControl } from "@angular/forms";

/**
 * @description Retorna um Date a partir de uma string
 * @export
 * @param {string} dh_Date
 * @return {*}
 */
export function String_To_Date(dh_Date: string) {
    return new Date(`${dh_Date.split("/")[1]}/${dh_Date.split("/")[0]}/${dh_Date.split("/")[2]}`)
}

export function Copy(object: any) {
    return JSON.parse(JSON.stringify(object))
}

export function Get_Max_Length(control: FormControl) {
    if (!control.validator) {
        return null;
    }

    let bigString = "";
    for (let i = 0; i < 5002; i++) {
        bigString += "A";
    }

    let controlAux = new FormControl(bigString);
    let validator = control.validator(controlAux);

    if (validator && validator.maxlength) {
        return validator.maxlength.requiredLength;
    } else {
        return null
    }
}

/**
 * @description Separa um array a partir de vários separadores
 * @export
 * @param {string} source String que será feito o corte
 * @param {string} splitBy Separadores
 * @returns
 */
export function Split_By_String(source: string, splitBy: string) {
    var splitter: any = splitBy.split('');
    splitter.push([source]); //Push initial value

    return splitter.reduceRight((accumulator, curValue) => {
        var k = [];
        accumulator.forEach(v => k = [...k, ...v.split(curValue)]);
        return k;
    });
}

/**
 * @description Copia para o clipboard o valor
 * @param {string} valor
 */
export function Copiar_Clipboard(valor: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = valor;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}