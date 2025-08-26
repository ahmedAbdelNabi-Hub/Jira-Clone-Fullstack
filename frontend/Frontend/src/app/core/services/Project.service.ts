import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { IBaseApiResponse } from '../interfaces/IBaseApiResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProject } from '../interfaces/IProject';
import { IMember } from '../interfaces/IMember';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }

    private readonly baseUrl = 'https://localhost:7182/api/v1/project';

    private _selectedProject = signal<IProject | null>(null);
    private _projectIdSubject = new BehaviorSubject<number | null>(null);
    private members$ = new BehaviorSubject<IMember[]>([]);
    members = this.members$.asObservable();
    readonly selectedProjectId$ = this._projectIdSubject.asObservable();
    readonly selectedProject = computed(() => this._selectedProject());

    setSelectedProject(project: IProject): void {
        this._selectedProject.set(project);
        this._projectIdSubject.next(project?.id ?? null);
    }

    cacheMembers(memebrs: IMember[]): void {
        this.members$.next(memebrs);
    }

    create(projectData: FormData): Observable<IBaseApiResponse> {
        return this.http.post<IBaseApiResponse>(`${this.baseUrl}/create`, projectData);
    }

    getMembers(projectId: number): Observable<IMember[]> {
        return this.http.get<IMember[]>(`${this.baseUrl}/${projectId}/members`);
    }

    update(project: IProject, logoFile: File | null): Observable<IBaseApiResponse> {
        const formData = new FormData();

        formData.append('id', project.id + '');
        formData.append('name', project.name);
        formData.append('key', project.key);
        formData.append('slug', project.slug);
        formData.append('description', project.description || '');
        if (logoFile instanceof File) {
            formData.append('logoFile', logoFile);
        }

        return this.http.put<IBaseApiResponse>(`${this.baseUrl}`, formData);
    }

    getAll(): Observable<IProject[]> {
        return this.http.get<IProject[]>(`${this.baseUrl}`);
    }

    getOwned(): Observable<IProject[]> {
        return this.http.get<IProject[]>(`${this.baseUrl}/owned`);
    }



}
