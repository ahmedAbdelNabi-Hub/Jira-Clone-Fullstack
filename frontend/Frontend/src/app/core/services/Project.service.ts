import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }
    private readonly baseUrl = 'https://localhost:7182/api/v1/project';

    create(projectData: FormData): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, projectData);
    }
}