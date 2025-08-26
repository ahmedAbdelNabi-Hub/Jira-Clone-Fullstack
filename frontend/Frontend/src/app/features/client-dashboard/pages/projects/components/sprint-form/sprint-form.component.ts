import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, finalize, takeUntil, tap, throwError } from 'rxjs';

import { IBaseApiResponse } from '../../../../../../core/interfaces/IBaseApiResponse';

import { ProjectService } from '../../../../../../core/services/Project.service';
import { SprintService } from '../../../../../../core/services/Sprint.service';
import { ToastService } from '../../../../../../core/services/toast.service';
import { ISprint } from '../../../../../../core/interfaces/ISprint';
import { ITaskItem } from '../../../../../../core/interfaces/ITaskItem';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sprint-form.component.html',
  styleUrl: './sprint-form.component.css'
})
export class SprintFormComponent implements OnInit, OnDestroy {
  @Input() sprint?: ISprint;
  private destroy$ = new Subject<void>();
  private originalTasks: ITaskItem[] = [];

  readonly loading = signal(false);
  readonly sprintResponse = signal<IBaseApiResponse | null>(null);
  readonly selectedProject = inject(ProjectService).selectedProject;
  buttonType = 'Create';

  sprintForm!: FormGroup;
  @Output() sprintStatusChange = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.sprint) {
      this.originalTasks = this.sprint.tasks ?? [];
      this.buttonType = 'Update';
      console.log('Editing Sprint:', this.sprint);
      this.sprintForm.patchValue({
        ...this.sprint,
        sprintId: this.sprint.id,
        startDate: this.formatDateForInput(this.sprint.startDate),
        endDate: this.formatDateForInput(this.sprint.endDate)
      });
    }
  }

  get projectId(): number {
    return this.selectedProject()?.id ?? 0;
  }

  get projectName(): string {
    return this.selectedProject()?.name ?? '';
  }

  private initForm(): void {
    this.sprintForm = this.fb.group(
      {
        sprintId: [''],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        projectId: [this.projectId, Validators.required],
        goal: ['', [Validators.required, Validators.maxLength(100)]],
        isActive: [false]
      },
      { validators: this.dateRangeValidator }
    );
  }
  formatDateForInput(dateStr: string): string {
    return dateStr ? dateStr.split('T')[0] : '';
  }



  private dateRangeValidator(form: FormGroup) {
    const start = new Date(form.get('startDate')?.value);
    const end = new Date(form.get('endDate')?.value);
    return start >= end ? { dateRange: true } : null;
  }

  onSubmit(): void {
    if (!this.sprintForm.valid || this.projectId === 0) {
      this.markFormTouched();
      return;
    }
    const sprintData = this.sprintForm.value;
    if (this.sprint) {
      this.updateSprint();
    } else {
      this.createSprint(sprintData);
    }
  }

  private markFormTouched(): void {
    Object.values(this.sprintForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getFieldError(field: string): string {
    const control = this.sprintForm.get(field);
    if (!control) return '';
    if (control.errors?.['required']) return `${this.formatField(field)} is required`;
    if (control.errors?.['minlength']) return `${this.formatField(field)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors?.['maxlength']) return `${this.formatField(field)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
    if (field === 'endDate' && this.sprintForm.errors?.['dateRange']) {
      return 'End date must be after start date';
    }
    return '';
  }

  private formatField(field: string): string {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  isFieldInvalid(field: string): boolean {
    const control = this.sprintForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onReset(): void {
    this.sprintForm.reset({
      name: '',
      startDate: '',
      endDate: '',
      projectId: this.projectId,
      isActive: false
    });
  }

  private createSprint(data: any): void {
    this.loading.set(true);

    this.sprintService.create(data).pipe(
      takeUntil(this.destroy$),
      tap((res: IBaseApiResponse) => {
        this.sprintResponse.set(res);
        this.toast.showSuccess('Sprint created successfully');
        this.sprintStatusChange.emit();
        this.onReset();
      }),
      catchError((error) => {
        this.toast.showError(error.error?.message || 'Failed to create sprint.');
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }


  updateSprint(): void {
    this.loading.set(true);
    const sprintId = this.sprintForm.get('sprintId')?.value;
    const sprintData = this.sprintForm.value;
    this.sprintService.updateSprint(sprintId, sprintData)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.toast.showSuccess('Sprint updated successfully');
          const fullSprint = this.CombiendTasksWithSprint(sprintData, sprintId);
          this.sprintStatusChange.emit(fullSprint);
        }),
        catchError((err) => {
          this.toast.showError(err?.error?.message || 'Failed to update sprint.');
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe();
  }

  private CombiendTasksWithSprint(sprintData: any, sprintId: number): ISprint {
    const updatedSprint: ISprint = {
      ...sprintData,
      id: sprintId,
      tasks: this.originalTasks
    };
    return updatedSprint;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
