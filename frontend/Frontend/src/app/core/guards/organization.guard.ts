import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OrganizationService } from '../services/Organization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';

@Injectable({ providedIn: 'root' })
export class OrganizationGuard implements CanActivate {
    constructor(
        private orgService: OrganizationService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.orgService.getByUserId().pipe(
            map(org => {
                if (org && org.slug) {
                    return this.router.createUrlTree(['/dashboard']);
                } else {
                    return true;
                }
            }),
            catchError((error: any) => {
                if (error.error.statusCode === 404 || error.error.statusCode === 401) {
                    return of(true);
                } else {
                    return of(this.router.createUrlTree(['/error']));
                }
            })
        );
    }
}
