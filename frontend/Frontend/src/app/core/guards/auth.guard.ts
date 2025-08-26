import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/AuthService.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        if (this.auth.isAuthenticated()) {
            return of(true);
        }

        return this.auth.fetchCurrentUser().pipe(
            map(user => {
                if (user) return true;

                return this.router.createUrlTree(['/login'], {
                    queryParams: { returnUrl: state.url }
                });
            }),
            catchError(() =>
                of(this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }))
            )
        );
    }
}
