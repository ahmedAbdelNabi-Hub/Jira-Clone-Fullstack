import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'board',
                pathMatch: 'full'
            },
            {
                path: 'summary',
                loadComponent: () => import('./views/summary/summary.component').then(m => m.SummaryComponent)
            },
            {
                path: 'timeline',
                loadComponent: () => import('./views/timeline/timeline.component').then(m => m.TimelineComponent)
            },
            {
                path: 'board',
                loadComponent: () => import('./views/board/board.component').then(m => m.BoardComponent)
            },
            {
                path: 'calendar',
                loadComponent: () => import('./views/calendar/calendar.component').then(m => m.CalendarComponent)
            },
            {
                path: 'list',
                loadComponent: () => import('./views/list/list.component').then(m => m.ListComponent)
            },
            {
                path: 'code',
                loadComponent: () => import('./views/code/code.component').then(m => m.CodeComponent)
            }
        ]
    }
];