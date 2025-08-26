import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
  signal,
  effect,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskPriority } from '../../../../../../core/enum/TaskPriority';
import { TaskType } from '../../../../../../core/enum/TaskType';
import { WorkItemStatus } from '../../../../../../core/enum/WorkItemStatus';

import { ITaskItem } from '../../../../../../core/interfaces/ITaskItem';
import { IWorkItem } from '../../../../../../core/interfaces/IWorkItem';
import { IMember } from '../../../../../../core/interfaces/IMember';

import { TaskService } from '../../../../../../core/services/Task.service';
import { ProjectService } from '../../../../../../core/services/Project.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserAssignmentDropdownComponent } from '../user-assignment-dropdown/user-assignment-dropdown/user-assignment-dropdown.component';
import { tap, finalize, catchError } from 'rxjs';
import { ToastService } from '../../../../../../core/services/toast.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserAssignmentDropdownComponent],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);

  @Input() sprintId!: number;
  @Input() task = signal<ITaskItem | null>(null);
  @Output() workItemCreated = new EventEmitter<ITaskItem>();

  @Input() projectMembers = signal<IMember[]>([]);
  private readonly isLoading = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  buttonType: string = 'Create';
  readonly assignedIds = computed(() =>
    this.projectMembers().map(user => user.userId)
  );

  readonly canSubmit = computed(() =>
    this.form?.valid && !this.isSubmitting()
  );

  form!: FormGroup;

  readonly taskStatusOptions = Object.freeze([
    { label: 'To Do', value: WorkItemStatus.ToDo },
    { label: 'In Progress', value: WorkItemStatus.InProgress },
    { label: 'Done', value: WorkItemStatus.Done }
  ]);

  readonly taskTypeOptions = Object.freeze([
    { label: 'Task', value: TaskType.Task },
    { label: 'Bug', value: TaskType.Bug },
    { label: 'Feature', value: TaskType.Story }
  ]);

  readonly taskPriorityOptions = Object.freeze([
    { label: 'Low', value: TaskPriority.Low },
    { label: 'Medium', value: TaskPriority.Medium },
    { label: 'High', value: TaskPriority.High },
    { label: 'Critical', value: TaskPriority.Critical }
  ]);

  readonly fieldLabels = Object.freeze({
    title: 'Title',
    description: 'Description',
    status: 'Status',
    type: 'Type',
    priority: 'Priority',
    assignedUsers: 'Assignees'
  } as const);

  constructor(private toast: ToastService) {
    effect(() => {
      const currentTask = this.task();
      if (currentTask && this.form) {
        this.buttonType = 'Update';
        this.setFormFromTask(currentTask);
      }
    });
  }

  ngOnInit(): void {
    const project = this.projectService.selectedProject();
    this.initializeForm(project?.id ?? null);
  }

  private initializeForm(projectId: number | null): void {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [''],
      status: [WorkItemStatus.ToDo, Validators.required],
      type: [TaskType.Task, Validators.required],
      priority: [TaskPriority.Low, Validators.required],
      assignedUsers: [[], Validators.required],
      projectId: [projectId],
      sprintId: [this.sprintId]
    });
  }

  private setFormFromTask(task: ITaskItem): void {
    this.form.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      type: task.type,
      priority: task.priority,
      assignedUsers: task.assignedUsers?.map(user => user.userId) || []
    }, { emitEvent: false });
  }




  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.markAllFieldsTouched();
      return;
    }

    const formData = this.form.value as ITaskItem | IWorkItem;
    const isUpdate = !!this.task();

    this.isSubmitting.set(true);

    const action$ = isUpdate
      ? this.taskService.update(formData as ITaskItem)
      : this.taskService.create(formData as IWorkItem);

    action$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((response) => {
          if (!isUpdate) this.resetForm();
          this.toast.showSuccess(response.statusCode + ' ' + response.message)
          this.workItemCreated.emit(formData as ITaskItem);
          this.isSubmitting.set(false);
        }),
        catchError((error) => {
          this.toast.showError(error.error.message || 'Failed to create task item.');
          this.isSubmitting.set(false);
          throw error;
        }),
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe();
  }


  private markAllFieldsTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onReset(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      title: '',
      description: '',
      status: WorkItemStatus.ToDo,
      type: TaskType.Task,
      priority: TaskPriority.Low,
      assignedUsers: [],
      projectId: this.projectService.selectedProject()?.id ?? null,
      sprintId: this.sprintId
    });
  }

  onUserAssignmentChange(userIds: string[]): void {
    this.form.patchValue({ assignedUsers: userIds });
  }

  // Optimized validation methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.touched || field.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${this.getFieldLabel(fieldName)} must be at most ${field.errors['maxlength'].requiredLength} characters`;
    }
    return '';
  }
  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      title: 'Title',
      description: 'Description',
      status: 'Status',
      type: 'Type',
      priority: 'Priority',
      assignedUsers: 'Assignees'
    };
    return labels[fieldName] || fieldName;
  }

  // Track by functions for ngFor optimization
  trackByValue = (index: number, item: { value: any }) => item.value;
  trackByUserId = (index: number, user: IMember) => user.userId;
}