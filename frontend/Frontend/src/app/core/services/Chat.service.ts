import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../interfaces/ICourse';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient) { }
    generateCoursePlan(courseTitle: string): Observable<Course> {
        return this.http.post<Course>(
            'https://localhost:7182/api/plan/generate',
            { topic: courseTitle }
        );
    }

}