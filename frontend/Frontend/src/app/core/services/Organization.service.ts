import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { IOrganization } from '../interfaces/IOrganization';
import { IMember } from '../interfaces/IMember';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private readonly baseUrl = 'https://localhost:7182/api/v1/organization';
    private organizationCache$: Observable<IOrganization> | null = null;
    constructor(private http: HttpClient) { }

    createOrganization(formData: FormData): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, formData);
    }

    getByUserId(): Observable<IOrganization> {
        if (!this.organizationCache$) {
            this.organizationCache$ = this.http.get<IOrganization>(
                `${this.baseUrl}/by-userId`,
                { withCredentials: true }
            ).pipe(
                shareReplay(1)
            );
        }
        return this.organizationCache$;
    }

    clearOrganizationCache(): void {
        this.organizationCache$ = null;
    }

    createOrganizationAndRefreshCache(formData: FormData): Observable<IBaseApiResponse> {
        this.clearOrganizationCache();
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, formData);
    }

    getOrganizationinvitations(): Observable<IOrganization[]> {
        return this.http.get<IOrganization[]>(`${this.baseUrl}/invitations`);
    }

    getOrganizationMembers(orgId: string): Observable<IMember[]> {
        return this.http.get<IMember[]>(`${this.baseUrl}/${orgId}/members`);
    }
}