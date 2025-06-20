import { animate, style, transition, trigger } from "@angular/animations";

export const toastAnimation = trigger('toastAnimation', [
    transition(':enter', [
        style({ 
            opacity: 0, 
            transform: 'translateX(100%) translateY(100%) scale(0.8)'
        }),
        animate('300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
            style({ 
                opacity: 1, 
                transform: 'translateX(0) translateY(0) scale(1)'
            })
        )
    ]),

    transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 1, 1)', 
            style({ 
                opacity: 0,
                transform: 'translateX(100%) translateY(0) scale(0.8)'
            })
        )
    ])
]);
