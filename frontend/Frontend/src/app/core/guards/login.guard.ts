import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
} from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { map } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.authInitialized$.pipe(
        map(() => {
            if (authService.isAuthenticated()) {
                router.navigate(['/dashboard'], {
                    queryParams: { returnUrl: state.url },
                    replaceUrl: true
                });
                return false;
            }
            return true;
        })
    );
};
