import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService.service';
import { IUser } from '../../core/interfaces/Authentication/IUser';
import { ProjectService } from '../../core/services/Project.service';
import { tap, catchError, of, Subject, take, takeUntil } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

interface ProjectType {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  currentStep = 2;
  userImage!: string;
  fullName!: string;
  isLoading = signal<boolean>(false);
  destroy$ = new Subject<void>();

  constructor(private route: Router, private toastService: ToastService, private projectService: ProjectService, private fb: FormBuilder, private auth: AuthService) {
    this.projectForm = this.fb.group({
      Key: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{2,10}$')]],
      Name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      LogoUrl: [null]
    });
  }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  private subscribeToUser(): void {
    this.auth.currentUser$.subscribe((user: IUser | null) => {
      if (user) {
        this.userImage = user.profileImage;
        this.fullName = user.fullName;
      }
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = new FormData();
      const formValue = this.projectForm.value;
      this.isLoading.set(true);
      Object.keys(formValue).forEach(key => {
        if (key !== 'LogoUrl') {
          formData.append(key, formValue[key]);
        }
      });
      if (this.selectedFile) {
        formData.append('LogoUrl', this.selectedFile);
      }
      this.projectService.create(formData).pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          this.isLoading.set(false);
          this.projectForm.reset();
          this.selectedFile = null;
          this.previewUrl = null;
          this.toastService.showSuccess(res.message);
          this.route.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.isLoading.set(false);
          this.toastService.showError(error.error.message);
          return of(null);
        })
      ).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
