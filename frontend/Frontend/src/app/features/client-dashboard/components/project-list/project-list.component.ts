// project-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IProject } from '../../../../core/interfaces/IProject';
import { ProjectService } from '../../../../core/services/Project.service';
import { OrganizationService } from '../../../../core/services/Organization.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: IProject[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private orgService: OrganizationService
  ) { }

  ngOnInit(): void {
    this.orgService.getByUserId().pipe(
      switchMap((org) => this.projectService.getAllProjects(org.id)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
