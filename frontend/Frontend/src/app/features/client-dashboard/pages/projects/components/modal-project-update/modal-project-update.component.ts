import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUpdateFormComponent } from '../project-update-form/project-update-form.component';
import { ProjectService } from '../../../../../../core/services/Project.service';
import { IProject } from '../../../../../../core/interfaces/IProject';
import { ManageProjectMemberComponent } from "../manage-project-member/manage-project-member.component";



@Component({
  selector: 'app-modal-project-update',
  standalone: true,
  imports: [CommonModule, ProjectUpdateFormComponent, ManageProjectMemberComponent],
  templateUrl: './modal-project-update.component.html',
  styleUrl: './modal-project-update.component.css'
})
export class ModalProjectUpdateComponent implements OnInit {
  private projectService = inject(ProjectService);
  selectedProject: IProject | null = null;
  activeTab = 'general';

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(project => {
      this.selectedProject = this.projectService.selectedProject();
    });
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }
}