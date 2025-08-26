import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IProject } from '../../../../core/interfaces/IProject';
import { ProjectService } from '../../../../core/services/Project.service';
import { OrganizationService } from '../../../../core/services/Organization.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @Output() loding = new EventEmitter<boolean>();
  projects: IProject[] = [];
  selectedProjectId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private orgService: OrganizationService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.orgService.getByUserId().pipe(
      switchMap(org => this.projectService.getAll()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (projects) => {
        this.projects = projects;
        if (this.projects.length > 0) {
          const storedProjectId = localStorage.getItem('selectedProjectId');
          const isFirstLoad = !this.selectedProjectId;
          const projectToSelect =
            this.projects.find(p => p.id === +storedProjectId!) || this.projects[0];
          this.selectedProjectId = projectToSelect.id;
          this.projectService.setSelectedProject(projectToSelect);
          if (isFirstLoad && location.pathname !== '/dashboard') {
            this.router.navigate(['/dashboard/projects/', projectToSelect.name]);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  setActiveProject(project: IProject): void {
    this.loding.emit(true);
    this.selectedProjectId = project.id;
    this.projectService.setSelectedProject(project);
    this.router.navigate(['/dashboard/projects/', project.name]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
