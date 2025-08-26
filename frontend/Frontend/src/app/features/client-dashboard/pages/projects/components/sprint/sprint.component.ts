import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ISprint } from '../../../../../../core/interfaces/ISprint';
import { IMenuItem } from '../../../../../../core/interfaces/IMenuItem';
import { ITaskItem } from '../../../../../../core/interfaces/ITaskItem';
import { getTypeLabel } from '../../../../../../core/enum/TaskType';
import { getPriorityLabel } from '../../../../../../core/enum/TaskPriority';
import { getStatusLabel } from '../../../../../../core/enum/WorkItemStatus';
import { SprintFormComponent } from "../sprint-form/sprint-form.component";
import { SprintService } from '../../../../../../core/services/Sprint.service';
import { ToastService } from '../../../../../../core/services/toast.service';
import { catchError, delay, finalize, of, Subject, takeUntil, tap } from 'rxjs';
import { TaskItemComponent } from "../task-item/task-item.component";
import { SprintStatus } from '../../../../../../core/enum/SprintStatus';
import { IMember } from '../../../../../../core/interfaces/IMember';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [CommonModule, DialogModule, ItemFormComponent, SprintFormComponent, TaskItemComponent],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @ViewChild('modalToggle') modalToggleRef!: ElementRef<HTMLInputElement>;
  @Input() sprint!: ISprint;
  @Input() Members = signal<IMember[]>([]);
  @Output() sprintStatusChange = new EventEmitter<void>();
  private sprintService = inject(SprintService);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();
  private sprintStatus: string = 'NotStarted';


  visible = false;
  showActionMenu = false;
  isOpen: boolean = true;
  isLoading = false;
  visibleItemForm = false;
  task = signal<ITaskItem | null>(null);


  items: IMenuItem[] = [
    { label: 'Task', icon: 'bx-task', isOpen: false },
    { label: 'Bug', icon: 'bx-bug-alt', isOpen: false },
    { label: 'Story', icon: 'bx-book-open', isOpen: false }
  ];
  showStatusConfirm: boolean = false;


  toggleActionMenu(): void {
    this.showActionMenu = !this.showActionMenu;
  }

  toggleSubMenu(item: IMenuItem): void {
    this.items.forEach(i => {
      if (i !== item) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }

  showDialog(): void {
    this.visible = true;
  }

  trackByTaskId(index: number, task: ITaskItem): string {
    return task.id + '';
  }
  handelCreated($event: ITaskItem) {
    this.visibleItemForm = false;
    this.sprintStatusChange.emit();
  }

  handleSprintStatusChange(sprint: ISprint) {
    this.visible = false;
    this.sprint = sprint;
  }

  deleteSprint(): void {
    this.isLoading = true;
    this.sprintService.deleteSprint(this.sprint.id).pipe(
      takeUntil(this.destroy$),
      tap({
        next: (response) => {
          this.toastService.showSuccess('Sprint deleted successfully');
          this.sprintStatusChange.emit();
        },
        error: (error) => {
          this.toastService.showError(error?.error?.message || 'Failed to delete sprint.');
        }
      }),

      delay(3000),
      finalize(() => {
        this.isLoading = false;
        if (this.modalToggleRef?.nativeElement?.checked) {
          this.modalToggleRef.nativeElement.checked = false;
        }
      })
    ).subscribe();
  }


  sentTaskToForm($event: ITaskItem) {
    this.task.set($event);
    this.visibleItemForm = true;
  }
  setStatus(status: string): void {
    this.sprintStatus = status;
    this.showStatusConfirm = true;
  }


  changeStatus(sprintId: number, currentStatus: string): void {
    this.isLoading = true;
    let newStatus: SprintStatus;
    switch (currentStatus) {
      case 'NotStarted':
        newStatus = SprintStatus.Started;
        break;
      case 'Started':
        newStatus = SprintStatus.Completed;
        break;
      case 'Completed':
      default:
        return;
    }
    this.sprintService.updateSprintStatus(sprintId, newStatus).pipe(
      takeUntil(this.destroy$),
      delay(1500),
      tap({
        next: () => {
          this.toastService.showSuccess('Sprint status updated successfully');
          this.sprint.status = SprintStatus[newStatus];
          this.sprintStatusChange.emit();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.showError(error?.error?.message || 'Failed to update sprint status.');
        }
      })
    ).subscribe();
  }


  HandelDeleted($event: number) {
    this.sprintStatusChange.emit();
  }

}
