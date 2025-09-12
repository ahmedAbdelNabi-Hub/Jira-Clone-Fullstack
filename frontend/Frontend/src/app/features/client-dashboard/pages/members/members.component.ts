import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { InvitationService } from '../../../../core/services/Invitation.service';
import { ProjectService } from '../../../../core/services/Project.service';
import { IProject } from '../../../../core/interfaces/IProject';
import { tap } from 'rxjs';
import { IMember } from '../../../../core/interfaces/IMember';
import { OrganizationService } from '../../../../core/services/Organization.service';
import { MemberImagePipe } from "../../../../shared/pipes/MemberImage.pipe";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberImagePipe],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  private projectService = inject(ProjectService);


  members: IMember[] = [];
  availableProjects: IProject[] = [];

  newMemberEmail: string = '';
  isLoading: boolean = false;
  selectedProjects: IProject[] = [];
  isDropdownOpen: boolean = false;

  constructor(private orgService: OrganizationService, private invitationService: InvitationService, private toast: ToastService) { }

  ngOnInit(): void {
    this.fetchOwnedProjects();
    this.fetchOrganizationMembers();
  }

  trackByMemberId(index: number, member: IMember): string {
    return member.userId;
  }

 
  fetchOwnedProjects(): void {
    this.projectService.getOwned().pipe(
      tap(response => {
        this.availableProjects = response;
      })
    ).subscribe();
  }

  sendInvite(): void {
    if (!this.isValidEmail(this.newMemberEmail)) {
      this.isLoading = false;
      return;
    }
    console.log('Selected Projects:', this.selectedProjects);
    this.isLoading = true;
    this.invitationService.sendInvitation(this.newMemberEmail, this.selectedProjects[0].id + '').subscribe({
      next: (res) => {
        this.toast.showSuccess('Invitation sent successfully!');
        this.newMemberEmail = '';
        this.selectedProjects = [];
        this.closeDropdown();
      },
      error: (err) => {
        this.toast.showError('Failed to send invitation');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  fetchOrganizationMembers(): void {
    this.orgService.getByUserId().subscribe({
      next: (org) => {
        this.orgService.getOrganizationMembers('' + org.id).subscribe({
          next: (members) => {
            this.members = members;
          },
          error: (err) => {
            console.error('Error fetching members:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching organization:', err);
      }
    });
  }

  isValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  isProjectSelected(project: IProject): boolean {
    return this.selectedProjects.some(p => p.id === project.id);
  }

  toggleProjectSelection(project: IProject): void {
    const index = this.selectedProjects.findIndex(p => p.id === project.id);
    if (index > -1) {
      this.selectedProjects.splice(index, 1);
    } else {
      this.selectedProjects.push(project);
    }
  }

  getSelectedProjectsText(): string {
    if (this.selectedProjects.length === 0) {
      return 'Select Projects';
    } else if (this.selectedProjects.length === 1) {
      return this.selectedProjects[0].name;
    } else {
      return `${this.selectedProjects.length} projects selected`;
    }
  }

  // Handle click outside dropdown to close it
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }
}