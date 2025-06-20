import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { IOrganization } from '../interfaces/IOrganization';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    private readonly baseUrl = 'https://localhost:7182/api/v1/organization';
    constructor(private http: HttpClient) { }
    createOrganization(formData: FormData): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, formData);
    }
    getByUserId(): Observable<IOrganization> {
        return this.http.get<IOrganization>(`${this.baseUrl}/by-userId`, { withCredentials: true });
    }
}
