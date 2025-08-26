import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InvitationService } from '../../core/services/Invitation.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class InvitationComponent implements OnInit, OnDestroy {
  token: string = '';
  isLoading = false;
  showSuccessModal = false;
  errorMessage = '';
  invitationData = {
    teamName: 'Innovate Tech Solutions',
  };

  private destroy$ = new Subject<void>();

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.token = params['token'] || '';
      this.loadInvitationDetails();
    });
  }

  loadInvitationDetails(): void {
    console.log('Loading invitation details for token:', this.token);
    // Optional: Call a service to load invitation info here
  }

  onAcceptInvitation(): void {
    if (!this.token) {
      this.errorMessage = 'Invalid invitation token.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.invitationService.acceptInvitation(this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.showSuccessModal = true;
          this.toastService.showSuccess('Invitation accepted successfully.');
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err?.error?.message || 'Failed to accept invitation.';
          this.toastService.showError(this.errorMessage);
        }
      });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
