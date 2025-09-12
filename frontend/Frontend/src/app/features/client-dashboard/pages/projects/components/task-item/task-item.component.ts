import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, signal } from '@angular/core';
import { Task } from '../../views/board/board.component';
import { CommonModule } from '@angular/common';
import { getTypeLabel } from '../../../../../../core/enum/TaskType';
import { getPriorityLabel } from '../../../../../../core/enum/TaskPriority';
import { getStatusLabel } from '../../../../../../core/enum/WorkItemStatus';
import { ITaskItem } from '../../../../../../core/interfaces/ITaskItem';
import { TaskService } from '../../../../../../core/services/Task.service';
import { ToastService } from '../../../../../../core/services/toast.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MemberImagePipe } from "../../../../../../shared/pipes/MemberImage.pipe";

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, MemberImagePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnDestroy {
  @Input() task!: ITaskItem;
  @Input() sprintId: number = 0;
  @Output() taskUpdated = new EventEmitter<ITaskItem>();
  @Output() taskDeleted = new EventEmitter<number>();

  private destroy$ = new Subject<void>();
  taskId = signal<number>(0);
  showDeleteConfirm = false;

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) { }

  getTypeIcon(type: string): string {
    switch (type?.toLowerCase()) {
      case 'bug': return 'bx-bug-alt';
      case 'feature': return 'bx-plus-circle';
      case 'improvement': return 'bx-trending-up';
      case 'story': return 'bx-book-open';
      default: return 'bx-circle';
    }
  }

  getTypeColor(type: string): string {
    switch (type?.toLowerCase()) {
      case 'bug': return 'text-red-600';
      case 'feature': return 'text-blue-600';
      case 'improvement': return 'text-green-600';
      case 'story': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toUpperCase()) {
      case 'URGENT': return 'bg-red-100 text-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getTaskTypeLabel(type: number): string {
    return getTypeLabel(type);
  }

  getPriorityLabel(priority: number): string {
    return getPriorityLabel(priority);
  }

  getStatusLabel(status: number): string {
    return getStatusLabel(status);
  }

  onImageError(event: any): void {
    event.target.src = 'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(event.target.alt || 'User') +
      '&background=e5e7eb&color=6b7280&size=128';
  }

  handelCreated($event: ITaskItem) {
    throw new Error('Method not implemented.');
  }

  handelEdit(task: ITaskItem) {
    this.taskUpdated.emit(task);
  }

  toggleDeleteConfirm(id: number): void {
    this.taskId.set(id);
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.taskId.set(0);
  }

  confirmDelete(): void {
    this.taskService.delete(this.taskId()).pipe(
      takeUntil(this.destroy$),
      tap({
        next: (response) => {
          this.taskDeleted.emit(this.taskId());
          this.showDeleteConfirm = false;
          this.taskId.set(0);
          this.toastService.showSuccess('Task deleted successfully');
        },
        error: (err) => {
          this.toastService.showError('Failed to delete task');
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}