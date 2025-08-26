import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, output, signal } from '@angular/core';
import { ProjectService } from '../../../../../../../../../core/services/Project.service';
import { IMember } from '../../../../../../../../../core/interfaces/IMember';

@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css'
})
export class UserAvatarComponent implements OnInit {
  @Input() initials: string = 'U';
  @Input() backgroundColor: string = 'bg-gray-500';
  @Output() onUserIdChange: EventEmitter<string> = new EventEmitter<string>();
  private projectService = inject(ProjectService);
  private isClickProcessing = false;
  private userId: string = '';

  members = signal<IMember[]>([]);

  ngOnInit(): void {
    this.projectService.members.subscribe(members => {
      this.members.set(members);
    })
  }

  selectUser(id: string): void {
    if (id === this.userId) return;
    if (this.isClickProcessing) return;
    this.isClickProcessing = true;
    this.userId = id;
    this.onUserIdChange.emit(id);
    setTimeout(() => {
      this.isClickProcessing = false;
    }, 400);
  }

}
