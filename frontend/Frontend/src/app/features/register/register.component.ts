import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SocialLoginModule, GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { catchError, delay, Observable, of, tap, Subscription, throwError } from 'rxjs';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { AuthService } from '../../core/services/AuthService.service';
import { ToastService } from '../../core/services/toast.service';
import { EmailValidator } from '../../core/Validators/AuthValidator';
import { AsyncDataHandler } from '../../core/models/Classes/AsyncDataHandler';
import { IAuthResponse } from '../../core/interfaces/Authentication/IAuthResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormErrorComponent,
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Services
  private socialAuthService = inject(SocialAuthService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  // Form and Data
  public registerForm!: FormGroup;
  public profileImage: string | null = null;
  public _asyncDataHandler = new AsyncDataHandler<IAuthResponse>();

  private selectedFile: File | null = null;
  private authSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.initializeForm();
    this.setupSocialAuthListener();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        EmailValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
    });
  }

  private setupSocialAuthListener(): void {
    this.authSubscription = this.socialAuthService.authState.subscribe({
      next: (response) => this.handleSocialAuthResponse(response),
      error: (error) => this.handleError(error)
    });
  }

  private handleError(error: any): void {
    this.toast.showError(error.error.message || 'An error occurred');
  }

  private handleSocialAuthResponse(response: any): void {
    this._asyncDataHandler.load(
      this.authService.registerWithGoogle(response.idToken).pipe(
        delay(3000),
        tap((response) => this.handleAuthSuccess(response)),
        catchError((error) => this.handleAuthError(error))
      )
    );
  }

  private handleAuthSuccess(response: IAuthResponse): void {
    if (response?.token) {
      this.authService.fetchCurrentUser().subscribe();
      this.router.navigate(['/orgss']);
    }
  }

  private handleAuthError(error: any): Observable<never> {
    this.toast.showError(error.error.message);
    return throwError(() => error);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.previewImage(this.selectedFile);
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    const formData = this.createFormData();
    this.processRegistration(formData);
  }

  private markFormAsTouched(): void {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.registerForm.value).forEach(key => {
      formData.append(key, this.registerForm.value[key]);
    });
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    return formData;
  }

  private processRegistration(formData: FormData): void {
    this._asyncDataHandler.load(
      this.authService.register(formData).pipe(
        delay(400),
        tap((response) => this.handleRegistrationSuccess(response)),
        catchError((error) => this.handleRegistrationError(error))
      )
    );
  }

  private handleRegistrationSuccess(response: IAuthResponse): void {
    if (response) {
      this.router.navigate(['/verification'], {
        queryParams: { email: this.registerForm.get('email')?.value }
      });
    }
  }

  private handleRegistrationError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'Registration failed';
    this.toast.showError(errorMessage || 'Registration failed');
    return throwError(() => error);
  }

  toggleDarkMode(): void {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}