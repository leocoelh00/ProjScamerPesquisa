
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Subject } from "rxjs";
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppAnimations } from "./app.animations";
import { SubjectService } from "./services/subject.service";

// declare google analytics
declare var gtag: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [AppAnimations]
})
export class AppComponent implements OnInit, OnDestroy {

    /** @description Variável que controla o Loading */
    b_Exibindo_Loading: boolean;

    /** @description Subject para destruir os subscribers */
    subject_unsub = new Subject()

    constructor(
        private subjectService: SubjectService,
        router: Router,
    ) {
        // Faz tratamento para sugerir instalar o sistema
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
        });

        // Ativa o Google Analytics somente se estiver em produção
        if (environment.production) {

            // Gtag Google Analytics
            const navEndEvent$ = router.events.pipe(
                filter(e => e instanceof NavigationEnd)
            );

            navEndEvent$.subscribe((e: NavigationEnd) => {
                gtag('config', 'G-WXPTE46VQ3', { 'page_path': e.urlAfterRedirects });
            });
        }
    }

    ngOnInit() {
        this.subjectService.subject_Exibindo_Loading.pipe(takeUntil(this.subject_unsub)).subscribe((bool: boolean) => {
            this.b_Exibindo_Loading = bool
        })
    }


    prepareRoute(
        outlet: RouterOutlet
    ) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData["animation"]
        );
    }

    ngOnDestroy() {
        this.subject_unsub.next(true)
        this.subject_unsub.complete()
    }
}