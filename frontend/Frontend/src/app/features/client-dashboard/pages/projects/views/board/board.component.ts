import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from '../../../../../../core/services/Task.service';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../../../../core/services/Project.service';
import { WorkItemStatus } from '../../../../../../core/enum/WorkItemStatus';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { EnumLabelPipe } from '../../../../../../shared/pipes/EnumLabel.pipe';
import { IMember } from '../../../../../../core/interfaces/IMember';
import { FiltersComponent } from "./components/filters/filters.component";
import { ITaskFilters } from '../../../../../../core/interfaces/ITaskFilters';


interface TaskAssignee {
  name: string;
  avatar: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: number;
  type: number;
  priority: number;
  sprintName?: string;
  sprintStartDate?: Date;
  sprintEndDate?: Date;
  image?: string;
  dueDate?: Date;
  comments?: number;
  assignedUsers?: IMember[];
  isBeingDragged?: boolean;
  isNewTask?: boolean;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, KanbanColumnComponent, DrawerModule, TaskFormComponent, FiltersComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy {

  taskFilters = signal<ITaskFilters>({
    statuses: [],
    priorities: [],
    assignedUserId: '',
    types: [],
    search: ''
  });

  private projectService = inject(ProjectService);
  readonly selectedProject = this.projectService.selectedProject;
  private destroy$ = new Subject<void>();


  tasks = signal<Task[]>([]);
  draggedTask = signal<Task | null>(null);
  dragOverColumn = signal<string | null>(null);
  nextTaskId = signal(8);
  visible = signal(false);
  position = signal<'right'>('right');

  todoTasks = computed(() => this.tasks().filter(t => t.status === WorkItemStatus.ToDo));
  inProgressTasks = computed(() => this.tasks().filter(t => t.status === WorkItemStatus.InProgress));
  reviewTasks = computed(() => this.tasks().filter(t => t.status === WorkItemStatus.InReview));
  doneTasks = computed(() => this.tasks().filter(t => t.status === WorkItemStatus.Done));
  totalTasks = computed(() => this.tasks().length);

  showDialog(pos: 'right') {
    this.position.set(pos);
    this.visible.set(true);
  }
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.projectService.selectedProjectId$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadTasks();
    });
  }

  onFiltersChanged($event: ITaskFilters) {
    this.taskFilters.set($event);
    this.loadTasks();
  }

  private loadTasks(): void {
    const projectId = this.selectedProject()?.id;
    if (projectId! > 0) {
      this.taskService.getTasksByProject(projectId!, this.taskFilters())
        .pipe(takeUntil(this.destroy$))
        .subscribe(tasks => this.distributeTasks(tasks));
    }
  }

  private distributeTasks(tasks: Task[]): void {
    this.tasks.set(tasks);
  }

  onDragStart(event: DragEvent, task: Task) {
    this.draggedTask.set(task);
    const updatedTasks = this.tasks().map(t =>
      t.id === task.id ? { ...t, isBeingDragged: true } : t
    );
    this.tasks.set(updatedTasks);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', task.id.toString());
    }
    setTimeout(() => {
      const element = event.target as HTMLElement;
      element.classList.add('dragging');
    }, 0);
  }

  onDragOver(event: DragEvent) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    return false;
  }

  onDragEnter(event: DragEvent, column: string) {
    event.preventDefault();
    this.dragOverColumn.set(column);
  }

  onDragLeave(event: DragEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.dragOverColumn.set(null);
    }
  }

  onDragEnd(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');

    const draggedTask = this.draggedTask();
    if (draggedTask) {
      const updatedTasks = this.tasks().map(t =>
        t.id === draggedTask.id ? { ...t, isBeingDragged: false } : t
      );
      this.tasks.set(updatedTasks);
    }

    this.draggedTask.set(null);
    this.dragOverColumn.set(null);
  }

  onDrop(event: DragEvent, status: WorkItemStatus) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    this.dragOverColumn.set(null);
    const draggedTask = this.draggedTask();
    if (!draggedTask) return;

    const updatedTasks = this.tasks().map(task => {
      if (task.id === draggedTask.id) {
        return {
          ...task,
          status,
          isBeingDragged: false,
          isNewTask: true
        };
      }
      return task;
    });

    this.tasks.set(updatedTasks);
    this.draggedTask.set(null);
    // Reset isNewTask after animation
    setTimeout(() => {
      const finalTasks = this.tasks().map(task =>
        task.id === draggedTask.id ? { ...task, isNewTask: false } : task
      );
      this.tasks.set(finalTasks);
    }, 500);
  }


  getTotalTasks(): number {
    return this.todoTasks.length + this.inProgressTasks.length + this.reviewTasks.length + this.doneTasks.length;
  }

  getTasksByStatus(status: string): Task[] {
    switch (status) {
      case 'todo': return this.todoTasks();
      case 'inProgress': return this.inProgressTasks();
      case 'review': return this.reviewTasks();
      case 'done': return this.doneTasks();
      default: return [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}