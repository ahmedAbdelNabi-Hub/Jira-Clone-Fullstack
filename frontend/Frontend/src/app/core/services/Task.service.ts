import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { Task } from '../../features/client-dashboard/pages/projects/views/board/board.component';
import { ITaskItem } from '../interfaces/ITaskItem';
import { ITaskFilters } from '../interfaces/ITaskFilters';
import { convertFilters } from '../utils/convertFilters';
import { IComment } from '../interfaces/IComment';
@Injectable({ providedIn: 'root' })
export class TaskService {
    baseUrl = 'https://localhost:7182/api/v1/Tasks';
    constructor(private http: HttpClient) { }
    create(formData: any): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, formData);
    }

    update(formData: ITaskItem): Observable<IBaseApiResponse> {
        return this.http.put<IBaseApiResponse>(`${this.baseUrl}/${formData.id}`, formData);
    }
    delete(taskId: number): Observable<IBaseApiResponse> {
        return this.http.delete<IBaseApiResponse>(`${this.baseUrl}/${taskId}`);
    }

    getTasksByProject(projectId: number, filters: ITaskFilters): Observable<Task[]> {
        const params = new HttpParams({ fromObject: convertFilters(filters) });
        return this.http.get<Task[]>(`${this.baseUrl}/${projectId}`, { params });
    }

    createComment(formData: any): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`https://localhost:7182/api/comments`, formData);
    }

    getComments(taskId: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`https://localhost:7182/api/comments/${taskId}`);
    }

}