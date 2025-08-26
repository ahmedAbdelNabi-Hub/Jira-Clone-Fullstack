import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../../core/services/Project.service';
import { IProject } from '../../../../../../core/interfaces/IProject';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../../core/services/toast.service';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-project-update-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-update-form.component.html',
  styleUrl: './project-update-form.component.css'
})
export class ProjectUpdateFormComponent implements OnInit, OnDestroy {
  private projectService = inject(ProjectService);
  private toast = inject(ToastService);
  private destory$ = new Subject<void>();
  private fb = inject(FormBuilder);

  projectForm: FormGroup;
  selectedProject: IProject | null = null;
  logoFile: File | null = null;
  logoPreview: string | null = null;

  constructor() {
    this.projectForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      key: ['', [Validators.required, Validators.pattern(/^[A-Z0-9_]+$/)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]]
    });
  }

  ngOnInit(): void {
    this.loadProjectData();
    this.projectService.selectedProjectId$.subscribe(project => {
      this.selectedProject = this.projectService.selectedProject();
      if (this.selectedProject) {
        this.loadProjectData();
      }
    });

    this.projectForm.get('name')?.valueChanges.subscribe(name => {
      if (name) {
        const slug = this.generateSlug(name);
        const key = this.generateKey(name);
        this.projectForm.patchValue({
          slug: slug,
          key: key
        }, { emitEvent: false });
      }
    });
  }

  loadProjectData(): void {
    if (this.selectedProject) {
      this.projectForm.patchValue({
        id: this.selectedProject.id,
        name: this.selectedProject.name,
        description: this.selectedProject.description,
        key: this.selectedProject.key,
        slug: this.selectedProject.slug
      });
      if (this.selectedProject.logoUrl) {
        this.logoPreview = this.selectedProject.logoUrl;
      }
    }
  }




  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.logoFile = file;
      this.createImagePreview(file);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      const file = files[0];
      this.logoFile = file;
      this.createImagePreview(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }


  defulteProjectData(): void {
    this.loadProjectData();
  }


  saveChanges(): void {
    if (this.projectForm.valid) {
      this.projectService.update(this.projectForm.value, this.logoFile)
        .pipe(
          takeUntil(this.destory$),
          tap(rep => {
            if (rep) {
              this.toast.showSuccess(rep.message);
            }
          }), catchError(error => {
            console.log(error);
            this.toast.showError(error.error.message);
            return of([])
          })
        ).subscribe();
      console.log(this.projectForm.value)
    }
    else {
      this.markFormGroupTouched();
    }
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoPreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private generateKey(name: string): string {
    return name.toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');
  }

  private resetForm(): void {
    this.projectForm.reset();
    this.logoFile = null;
    this.logoPreview = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.projectForm.controls).forEach(key => {
      this.projectForm.get(key)?.markAsTouched();
    });
  }


  // Getters for form validation
  get name() { return this.projectForm.get('name'); }
  get description() { return this.projectForm.get('description'); }
  get key() { return this.projectForm.get('key'); }
  get slug() { return this.projectForm.get('slug'); }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.projectForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['maxlength']) return `${fieldName} is too long`;
      if (field.errors['pattern']) return `${fieldName} format is invalid`;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}