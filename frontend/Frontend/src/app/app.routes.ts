import { Routes } from '@angular/router';
import { PROJECT_ROUTES } from './features/client-dashboard/pages/projects/project.routes';
import { OrganizationGuard } from './core/guards/organization.guard';
import { RedirectIfHasOrgGuard } from './core/guards/redirectIfHasOrg.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../app/features/home/home.component').then(m => m.HomeComponent) },
    { path: 'ai-chat', loadComponent: () => import('../app/features/ai-chat/ai-chat.component').then(m => m.AiChatComponent) },
    { path: 'orgss', canActivate: [OrganizationGuard], loadComponent: () => import('../app/features/organization/organization.component').then(m => m.OrganizationComponent) },
    { path: 'create-project', canActivate: [RedirectIfHasOrgGuard], loadComponent: () => import('../app/features/create-project/create-project.component').then(m => m.CreateProjectComponent) },
    { path: 'sign-out', canActivate: [], loadComponent: () => import('../app/features/register/register.component').then(m => m.RegisterComponent) },
    {
        path: 'dashboard', canActivate: [RedirectIfHasOrgGuard], loadComponent: () => import('../app/features/client-dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent),
        children: [
            { path: '', redirectTo: 'projects', pathMatch: 'full' },
            { path: 'team', loadComponent: () => import('../app/features/client-dashboard/pages/team/team.component').then(m => m.TeamComponent) },
            {
                path: 'projects',
                loadComponent: () => import('../app/features/client-dashboard/pages/projects/projects.component').then(m => m.ProjectsComponent),
                children: PROJECT_ROUTES
            },
        ]
    },
    { path: 'verification', loadComponent: () => import('../app/features/confirm-email/confirm-email.component').then(m => m.ConfirmEmailComponent) },
    { path: 'chat', canActivate: [], loadComponent: () => import('../app/features/chat/chat.component').then(m => m.ChatComponent) },
    { path: 'login', canActivate: [], loadComponent: () => import('../app/features/login/login.component').then(m => m.LoginComponent) },
];
