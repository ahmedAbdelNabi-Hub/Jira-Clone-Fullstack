import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { EnumLabelPipe } from '../../../../../../../../shared/pipes/EnumLabel.pipe';
import { Task } from '../../board.component';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, EnumLabelPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  @Output() openCommend = new EventEmitter<number>();

  priorityClass = computed(() => ({
    'bg-red-100 text-red-700': this.task.priority === 2,
    'bg-yellow-100 text-yellow-700': this.task.priority === 1,
    'bg-green-100 text-green-700': this.task.priority === 0
  }));

  taskStatus = computed(() => this.task.status);
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
    this.openCommend.emit(taskId);
  }
}
