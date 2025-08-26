import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAuthResponse } from '../../core/interfaces/Authentication/IAuthResponse';
import { AsyncDataHandler } from '../../core/models/Classes/AsyncDataHandler';
import { AuthService } from '../../core/services/AuthService.service';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})

export class ConfirmEmailComponent {
  private AuthService = inject(AuthService);
  public otpForm!: FormGroup;
  public _asyncDataHandler = new AsyncDataHandler<IAuthResponse>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private email = computed(() => this.route.snapshot.queryParamMap.get('email') ?? '');
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      0: new FormControl(''),
      1: new FormControl(''),
      2: new FormControl(''),
      3: new FormControl(''),
      4: new FormControl(''),
      5: new FormControl('')
    });
  }

  get otpControls() {
    return Object.keys(this.otpForm.controls);
  }

  autoFocusNext(index: number, event: any): void {
    const input = event.target;
    const nextInput = input.parentElement?.children[index + 1];
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  onSubmit(): void {
    const otp = Object.values(this.otpForm.value).join('');
    this._asyncDataHandler.load(this.AuthService.confirmEmail(otp, this.email()).pipe(
      delay(2000),
      tap(data => {
        if (data) {
          this.AuthService.fetchCurrentUser().subscribe();
          this.router.navigate(['/orgss']);
        }
      })
    ))
  }
}
