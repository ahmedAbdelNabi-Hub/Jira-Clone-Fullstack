import { Component, inject, OnInit, OnDestroy, signal, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SocialAuthService, SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { EmailValidator } from '../../core/Validators/AuthValidator';
import { interval, Subscription, switchMap, take, filter, takeUntil, Subject, tap, catchError } from 'rxjs';
import { IAuthResponse } from '../../core/interfaces/Authentication/IAuthResponse';
import { AsyncDataHandler } from '../../core/models/Classes/AsyncDataHandler';
import { AuthService } from '../../core/services/AuthService.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { response } from 'express';

interface Slide {
  image: string;
  title: string;
  description: string;
  type?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormErrorComponent,
    CommonModule,
    RouterModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly socialAuthService = inject(SocialAuthService);
  private readonly _authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly isBrowser = signal(false);
  readonly _asyncDataHandler = new AsyncDataHandler<IAuthResponse>();
  returnUrl: string = '/';

  loginForm!: FormGroup;
  currentIndex = 0;

  private _slides?: Slide[];
  get slides(): Slide[] {
    if (!this._slides) {
      this._slides = [
        {
          image: 'Real-time-collaboration-wrike-1X.mp4',
          title: '',
          description: '',
          type: 'video'
        },
        {
          image: 'Capacity_1X.mp4',
          title: '',
          description: '',
          type: 'video'
        },
        {
          image: '4.webp',
          title: '',
          description: '',
          type: 'image'
        },
      ];
    }
    return this._slides;
  }

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
    this.initializeForm();
    this.setupGoogleAuth();
    this.startAutoSlide();
  }



  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator()]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  private setupGoogleAuth(): void {
    this.socialAuthService.authState.pipe(
      filter(response => !!response?.idToken),
      switchMap(response => {
        this._asyncDataHandler.load(this._authService.loginWithGoogle(response.idToken));
        return this._asyncDataHandler.data$;
      }),
      filter(response => !!response),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (user) => {
        console.log('Current user:', user);
      },
      error: (error) => console.error('Auth error:', error)
    });
  }

  private startAutoSlide(): void {
    if (!this.isBrowser()) return;
    interval(10000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.nextSlide();
    });
  }

  setCurrentSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._asyncDataHandler.load(this._authService.login(this.loginForm.value));
    this._asyncDataHandler.data$.pipe(
      filter(response => !!response),
      take(1),
      takeUntil(this.destroy$),
      tap(response => {
        this._authService.fetchCurrentUser().pipe(takeUntil(this.destroy$)).subscribe();
        this.router.navigate(['/dashboard']);
        this.loginForm.reset();
      }),
      catchError(error => {
        this.toast.showError(error.message);
        return error;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}