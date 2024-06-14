import { Injectable } from "@angular/core";
import { AuthRepository } from "../repositories/auth.repository";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

      httpOptions: any

      constructor(
        private authRepository: AuthRepository
      ){}

      Login(ds_Login: string, ds_Senha: string){
            return this.authRepository.Login(ds_Login, ds_Senha)
      }
  }