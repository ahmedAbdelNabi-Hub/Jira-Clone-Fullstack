import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OrganizationService } from '../services/Organization.service';

@Injectable({ providedIn: 'root' })
export class RedirectIfHasOrgGuard implements CanActivate {
    constructor(
        private orgService: OrganizationService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.orgService.getByUserId().pipe(
            map(org => {
                if (org && org.slug) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/orgss']);
                }
            }),
            catchError(() => {
                this.router.navigate(['/orgss']);    
                return of(true);
            })
        );
    }
}
