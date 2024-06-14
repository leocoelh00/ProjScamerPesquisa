import { animate, query, style, transition, trigger } from "@angular/animations";

export const AppAnimations = trigger("routeAnimations", [
    transition("* => LoginPage", [
        // Set a default  style for enter and leave
        query(
            ":enter, :leave",
            [
                style({
                    position: "absolute",
                    left: "0",
                    width: "100%",
                    opacity: 0,
                    transform: "translateX(100%)"
                })
            ],
            { optional: true }
        ),
        // Animate the new page in
        query(
            ":enter",
            [
                animate(
                    "390ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                    style({ opacity: 1, transform: "translateX(0)" })
                )
            ],
            { optional: true }
        )
    ]),
    transition("* => ErrorPage", [
        // Set a default  style for enter and leave
        query(
            ":enter, :leave",
            [
                style({
                    position: "absolute",
                    left: "0",
                    width: "100%",
                    opacity: 0,
                    transform: "translateX(100%)"
                })
            ],
            { optional: true }
        ),
        // Animate the new page in
        query(
            ":enter",
            [
                animate(
                    "390ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                    style({ opacity: 1, transform: "translateX(0)" })
                )
            ],
            { optional: true }
        )
    ]),
    transition("LoginPage <=> HomePage", [
        // Set a default  style for enter and leave
        query(
            ":enter, :leave",
            [
                style({
                    position: "absolute",
                    left: "120px",
                    width: "calc(100% - 120px)",
                    opacity: 0,
                    transform: "translateX(100%)"
                })
            ],
            { optional: true }
        ),
        // Animate the new page in
        query(
            ":enter",
            [
                animate(
                    "390ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                    style({ opacity: 1, transform: "translateX(0)" })
                )
            ],
            { optional: true }
        )
    ]),
    transition("* <=> *", [
        // Set a default  style for enter and leave
        query(
            ":enter, :leave",
            [
                style({
                    position: "absolute",
                    left: "120px",
                    width: "calc(100% - 120px)",
                    opacity: 0,
                    transform: "scale(0.5) translateY(0)"
                })
            ],
            { optional: true }
        ),
        // Animate the new page in
        query(
            ":enter",
            [
                animate(
                    "280ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                    style({ opacity: 1, transform: "scale(1) translateY(0)" })
                )
            ],
            { optional: true }
        )
    ])
]);

export const PopupAnimation =
    trigger(
        'enterAnimation', [
        transition(':enter', [
            style({ transform: 'scale(0)', opacity: 0 }),
            animate('150ms', style({ transform: 'scale(1)', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'scale(1)', opacity: 1 }),
            animate('150ms', style({ transform: 'scale(0)', opacity: 0 }))
        ])
    ]
)
