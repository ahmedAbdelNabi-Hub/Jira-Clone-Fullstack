import { Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { HttpClient } from '@angular/common/http';
import { ISprint } from '../interfaces/ISprint';
import { SprintStatus } from '../enum/SprintStatus';

@Injectable({ providedIn: 'root' })
export class SprintService {
    constructor(private http: HttpClient) { }
    baseUrl = 'https://localhost:7182/api/v1/sprints';

    create(data: any): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}`, data);
    }

    updateSprint(Id: number, sprint: ISprint): Observable<any> {
        return this.http.put(`${this.baseUrl}/${Id}`, sprint);
    }

    deleteSprint(Id: number): Observable<IBaseApiResponse> {
        return this.http.delete<IBaseApiResponse>(`${this.baseUrl}/${Id}`);
    }

    updateSprintStatus(sprintId: number, newStatus: SprintStatus) {
        return this.http.put(`${this.baseUrl}/${sprintId}/status`, newStatus);
    }

    getAllSprints(projectId: number): Observable<ISprint[]> {
        return this.http.get<ISprint[]>(`${this.baseUrl}?projectId=${projectId}`);
    }
}