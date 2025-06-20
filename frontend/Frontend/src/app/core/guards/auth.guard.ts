import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.authInitialized$.pipe(
        switchMap(() => {
            const isAuth = authService.isAuthenticated();
            if (!isAuth) {
                router.navigate(['/login'], {
                    queryParams: { returnUrl: state.url },
                    replaceUrl: true
                });
                return of(false);
            }
            return of(true);
        })
    );
};
