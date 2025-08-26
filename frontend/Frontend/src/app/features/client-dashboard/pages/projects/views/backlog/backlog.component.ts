import { CommonModule } from '@angular/common';
import { Component, signal, effect, inject, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClickOutsideDirective } from '../../../../../../shared/directives/ClickOutside.directive';
import { DialogModule } from 'primeng/dialog';
import { SprintFormComponent } from '../../components/sprint-form/sprint-form.component';
import { SprintComponent } from '../../components/sprint/sprint.component';
import { finalize, catchError, of } from 'rxjs';
import { SprintService } from '../../../../../../core/services/Sprint.service';
import { ProjectService } from '../../../../../../core/services/Project.service';
import { IMenuItem } from '../../../../../../core/interfaces/IMenuItem';
import { ISprint } from '../../../../../../core/interfaces/ISprint';
import { IMember } from '../../../../../../core/interfaces/IMember';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    CommonModule,
    ClickOutsideDirective,
    DialogModule,
    SprintFormComponent,
    SprintComponent
  ],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent {
  sprints = signal<ISprint[]>([]);
  isLoading = signal(false);
  visible = false;
  isDropdownOpen = signal(false);
  isCreate: boolean = false;
  isOpen: boolean = true;
  hasSelectedProject = computed(() => !!this.projectService.selectedProject()?.id);
  sprintCount = computed(() => this.sprints().length);
  projectId = signal<number>(0);
  items: IMenuItem[] = [
    { label: 'Task', icon: 'bx-task', isOpen: false },
    { label: 'Bug', icon: 'bx-bug-alt', isOpen: false },
    { label: 'Story', icon: 'bx-book-open', isOpen: false }
  ];

  private sprintService = inject(SprintService);
  private projectService = inject(ProjectService);
  private destroyRef = inject(DestroyRef);
  readonly projectMembers = signal<IMember[]>([]);

  constructor() {
    effect(() => {
      const project = this.projectService.selectedProject();
      this.projectId.set(project?.id!);
      project?.id ? this.fetchSprints(project.id) : this.sprints.set([]);
    });

    effect(() => {
      const project = this.projectService.selectedProject();
      if (project?.id) {
        this.loadProjectMembers(project.id);
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
    if (!this.isDropdownOpen()) this.resetMenuItems();
  }

  toggleSubMenu(targetItem: IMenuItem): void {
    this.items.forEach(item => item.isOpen = item === targetItem ? !item.isOpen : false);
  }

  showDialog(): void {
    this.visible = true;
  }

  handleSprintOutput(): void {
    this.fetchSprints(this.projectId());
    this.visible = false;
  }

  refreshSprints(): void {
    if (this.hasSelectedProject()) this.fetchSprints(this.projectId());
  }

  private fetchSprints(projectId: number): void {
    if (!this.hasSelectedProject()) return;
    this.isLoading.set(true);
    this.sprintService.getAllSprints(projectId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(error => {
          console.error('Failed to fetch sprints:', error);
          return of([]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(sprints => this.sprints.set(sprints));
  }

  private loadProjectMembers(projectId: number): void {
    this.isLoading.set(true);
    this.projectService.getMembers(projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (members) => {
          this.projectMembers.set(members);
          console.log("static ", this.projectMembers())
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Failed to load project members:', error);
          this.isLoading.set(false);
        }
      });
  }

  private resetMenuItems(): void {
    this.items.forEach(item => item.isOpen = false);
  }
}