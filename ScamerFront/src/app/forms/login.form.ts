import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginParams } from "../models/login/login-params.model";
import { CustomValidators } from "../utils/validator/custom-validators";

@Injectable({
    providedIn: "root"
})
export class LoginFormService {

    constructor(private formBuilder: FormBuilder) {
    }

    get Get_Form() {
        return this.formBuilder.group({
            ds_Login: [null, [Validators.required]],
            ds_Senha: [null, [Validators.required]]
        }) as FormGroupTyped<LoginParams>
    }


}