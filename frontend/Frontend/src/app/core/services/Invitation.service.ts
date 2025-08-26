import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { OrganizationService } from './Organization.service';

@Injectable({ providedIn: 'root' })
export class InvitationService {
    private readonly baseUrl = 'https://localhost:7182/api/v1/invitation';
    constructor(private http: HttpClient, private orgService: OrganizationService) { }

    // sendInvitation(inviteeEmail: string): Observable<IBaseApiResponse> {
    //     return new Observable<IBaseApiResponse>((observer) => {
    //         this.orgService.getByUserId().subscribe({
    //             next: (org) => {
    //                 const body = {
    //                     organizationId: org.id,
    //                     inviteeEmail: inviteeEmail
    //                 };

    //                 this.http.post<IBaseApiResponse>(`${this.baseUrl}/send`, body, {
    //                     withCredentials: true
    //                 }).subscribe({
    //                     next: (res) => observer.next(res),
    //                     error: (err) => observer.error(err),
    //                     complete: () => observer.complete()
    //                 });
    //             },
    //             error: (err) => observer.error(err)
    //         });
    //     });
    // }

    sendInvitation(inviteeEmail: string, projectId: string): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/send`, { inviteeEmail, projectId });
    }

    acceptInvitation(token: string): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/accept?token=${encodeURIComponent(token)}`, {})
    }
}