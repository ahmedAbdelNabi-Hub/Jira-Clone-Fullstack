import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';


export enum WorkItemStatus {
  ToDo = 0,
  InProgress = 1,
  Done = 2,
  Blocked = 3
}

export enum TaskType {
  Task = 0,
  Bug = 1,
  Story = 2,
  Epic = 3
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3
}

interface TaskItem {
  title: string;
  description?: string;
  status: WorkItemStatus;
  type: TaskType;
  priority: TaskPriority;
  sprintId?: number;
  backlogId?: number;
  projectId: number;
  assigneeIds?: number[];
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    SelectModule,
    FloatLabelModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() taskSubmitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  taskForm!: FormGroup;
  isSubmitting = false;
  showDebug = false; // Set to true for debugging

  statusOptions = [
    { label: 'To Do', value: WorkItemStatus.ToDo, icon: 'bx bx-list-ul' },
    { label: 'In Progress', value: WorkItemStatus.InProgress, icon: 'bx bx-time' },
    { label: 'Done', value: WorkItemStatus.Done, icon: 'bx bx-check-circle' },
    { label: 'Blocked', value: WorkItemStatus.Blocked, icon: 'bx bx-block' }
  ];
  

  typeOptions = [
    { label: 'Task', value: TaskType.Task, icon: 'bx bx-check' },
    { label: 'Bug', value: TaskType.Bug, icon: 'bx bx-bug' },
    { label: 'Story', value: TaskType.Story, icon: 'bx bx-book' },
    { label: 'Epic', value: TaskType.Epic, icon: 'bx bx-trophy' }
  ];

  priorityOptions = [
    { label: '🟢 Low', value: TaskPriority.Low },
    { label: '🟡 Medium', value: TaskPriority.Medium },
    { label: '🟠 High', value: TaskPriority.High },
    { label: '🔴 Critical', value: TaskPriority.Critical }
  ];

  projects = [
    { id: 1, name: 'Zenith Project' },
    { id: 2, name: 'Alpha Project' },
    { id: 3, name: 'Beta Project' }
  ];

  sprints = [
    { id: 1, name: 'Sprint 1' },
    { id: 2, name: 'Sprint 2' },
    { id: 3, name: 'Sprint 3' }
  ];

  users = [
    { id: 1, name: 'Ahmed', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 2, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Omar', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 4, name: 'Fatima', avatar: 'https://i.pravatar.cc/150?img=9' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: [WorkItemStatus.ToDo, Validators.required],
      type: [TaskType.Task, Validators.required],
      priority: [TaskPriority.Low, Validators.required],
      sprintId: [null],
      backlogId: [null],
      projectId: [this.projects[0].id, Validators.required],
      assigneeIds: [[]]
    });
  }

  submit(): void {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      const task: TaskItem = this.taskForm.value;

      // Clean up null values
      if (!task.sprintId) {
        delete task.sprintId;
      }
      if (!task.backlogId) {
        delete task.backlogId;
      }
      if (!task.assigneeIds || task.assigneeIds.length === 0) {
        delete task.assigneeIds;
      }

      this.http.post('https://localhost:7197/api/tasks', task).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
          this.taskSubmitted.emit();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Failed to submit task:', err);
          this.isSubmitting = false;
          // You might want to show a toast or error message here
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: WorkItemStatus.ToDo,
      type: TaskType.Task,
      priority: TaskPriority.Low,
      sprintId: null,
      backlogId: null,
      projectId: this.projects[0].id,
      assigneeIds: []
    });
  }
}
