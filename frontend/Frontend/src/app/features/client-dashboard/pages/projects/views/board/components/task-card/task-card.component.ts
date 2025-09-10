import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, signal } from '@angular/core';
import { EnumLabelPipe } from '../../../../../../../../shared/pipes/EnumLabel.pipe';
import { Task } from '../../board.component';
import { IMember } from '../../../../../../../../core/interfaces/IMember';
import { AuthService } from '../../../../../../../../core/services/AuthService.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, EnumLabelPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) task!: Task;
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  @Output() openCommend = new EventEmitter<{ taskId: number, isUser: boolean }>();
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>;
  priorityClass = computed(() => ({
    'bg-red-100 text-red-700': this.task.priority === 2,
    'bg-yellow-100 text-yellow-700': this.task.priority === 1,
    'bg-green-100 text-green-700': this.task.priority === 0
  }));
  taskStatus = computed(() => this.task.status);
  isUser = signal<boolean>(false);

  ngOnInit(): void {

  }



  onDragStart(event: DragEvent) {
    this.dragStart.emit(event);
  }

  onDragEnd(event: DragEvent) {
    this.dragEnd.emit(event);
  }

  onImageError(event: any): void {
    event.target.src = 'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(event.target.alt || 'User') +
      '&background=e5e7eb&color=6b7280&size=128';
  }

  openCommentModal(taskId: number): void {
    this.authService.fetchCurrentUser().pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.isUser.set(this.findUserById(user?.id)!);
        console.log(this.isUser());
        this.openCommend.emit({ taskId: taskId, isUser: this.isUser() });

      }
    })
  }

  findUserById(id: string): boolean {
    return this.task.assignedUsers?.some(user => user.userId === id) ?? false;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
