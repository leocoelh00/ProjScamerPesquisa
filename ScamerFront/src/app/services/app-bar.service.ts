import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AppBarService {

    subject_Exibindo_Bar = new BehaviorSubject(false);

}