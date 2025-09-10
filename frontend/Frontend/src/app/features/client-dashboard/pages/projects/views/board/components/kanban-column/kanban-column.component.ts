import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../board.component";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {
  @Input() tasks: Task[] = [];
  @Input() title!: string;
  @Input() status!: string;
  @Input() dragOverColumn: string | null = null;

  @Output() dropTask = new EventEmitter<DragEvent>();
  @Output() dragStart = new EventEmitter<{ event: DragEvent, task: Task }>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  @Output() dragEnter = new EventEmitter<DragEvent>();
  @Output() dragLeave = new EventEmitter<DragEvent>();
  @Output() dragOver = new EventEmitter<DragEvent>();
  @Output() openCommend = new EventEmitter<{ taskId: number, isUser: boolean }>();

  onDrop(event: DragEvent) {
    this.dropTask.emit(event);
  }

  onCardDragStart(event: DragEvent, task: Task) {
    this.dragStart.emit({ event, task });
  }

  onCardDragEnd(event: DragEvent) {
    this.dragEnd.emit(event);
  }
  getHeaderBgColor(status: string): string {
    switch (status) {
      case 'todo':
        return 'bg-gray-50';
      case 'inprogress':
        return 'bg-blue-50';
      case 'inreview':
        return 'bg-stone-100';
      case 'done':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  }

  getDotColor(status: string): string {
    switch (status) {
      case 'todo':
        return 'bg-gray-50';
      case 'inprogress':
        return 'bg-blue-50';
      case 'inreview':
        return 'bg-yellow-50';
      case 'done':
        return 'bg-green-50';
      default:
        return 'bg-gray-400';
    }
  }

  handelOpenCommend(data: { taskId: number, isUser: boolean } ): void {
    console.log(data)
    this.openCommend.emit(data);
  }

}
