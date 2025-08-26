import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/AuthService.service';
import { ProjectService } from '../../../../core/services/Project.service';
import { ModalProjectUpdateComponent } from "./components/modal-project-update/modal-project-update.component";
import { IMember } from '../../../../core/interfaces/IMember';
import { Subject, takeUntil, tap } from 'rxjs';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, RouterModule, ModalProjectUpdateComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  activeMenu: string | null = null;
  activeTab: string = 'board';
  member = signal<IMember[]>([]);
  projectService = inject(ProjectService);
  selectedProject = this.projectService.selectedProject;
  private readonly destroy$ = new Subject<void>();

  tabs: TabConfig[] = [
    { id: 'Overview', label: 'Overview', icon: 'bx bx-world', route: 'summary' },
    { id: 'Backlog', label: 'Backlog', icon: 'bx bx-columns bx-rotate-270', route: 'backlog' },
    { id: 'Table', label: 'Timeline', icon: 'bx-table', route: 'timeline' },
    { id: 'Board', label: 'Board', icon: 'bx-layout', route: 'board' },
    { id: 'Calendar', label: 'Calendar', icon: 'bx-calendar', route: 'calendar' },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private auth: AuthService) { }

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(id => {
      this.loadMemberProject(id!);
    })
  }

  onImageError(event: any): void {
    event.target.src = 'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(event.target.alt || 'User') +
      '&background=e5e7eb&color=6b7280&size=128';
  }



  loadMemberProject(projectId: number): void {
    this.projectService.getMembers(projectId).pipe(
      takeUntil(this.destroy$),
      tap(response => {
        if (response)
          this.member.set(response);
        this.projectService.cacheMembers(response);
      })
    ).subscribe();
  }


  selectTab(tab: string) {
    this.activeTab = tab;
  }

  toggleMenu(event: Event, menuId: string) {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  handleMenuAction(action: string, tab: string) {
    this.closeMenu();
  }

  closeMenu() {
    this.activeMenu = null;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', () => this.closeMenu());
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
