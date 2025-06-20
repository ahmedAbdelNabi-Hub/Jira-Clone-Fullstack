import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, catchError, shareReplay, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { IAuthResponse } from '../interfaces/Authentication/IAuthResponse';
import { IUser } from '../interfaces/Authentication/IUser';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private authInitializedSubject = new BehaviorSubject<boolean>(false);
  public authInitialized$ = this.authInitializedSubject.asObservable();

  private readonly storageKey = 'auth_data';
  private readonly encryptionKey = 'your-secret-key-123';

  private cachedUser$: Observable<IUser | null> | null = null;
  private verificationInProgress = false;

  private readonly baseUrl = 'https://localhost:7182/api/v1/auth/';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const storedData = this.getStoredAuthData();
    if (storedData?.user && storedData?.signature && this.verifySignature(storedData.user, storedData.signature)) {
      this.currentUserSubject.next(storedData.user);
    } else {
      this.clearAuthStorage();
    }

    this.authInitializedSubject.next(true);
  }

  private getStoredAuthData(): { user: IUser | null; signature: string } | null {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private createSignature(data: any): string {
    const dataString = JSON.stringify(data);
    return CryptoJS.HmacSHA256(dataString, this.encryptionKey).toString();
  }

  private verifySignature(data: any, signature: string): boolean {
    return this.createSignature(data) === signature;
  }

  private setAuthData(user: IUser | null): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!user) {
      this.clearAuthStorage();
      return;
    }

    const signature = this.createSignature(user);
    const dataToStore = { user, signature };
    localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
  }

  private clearAuthStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
  }


  public isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const storedData = this.getStoredAuthData();
    return !!storedData?.user && this.verifySignature(storedData.user, storedData.signature);
  }

  public fetchCurrentUser(): Observable<IUser | null> {
    if (this.verificationInProgress && this.cachedUser$) {
      return this.cachedUser$;
    }
    this.verificationInProgress = true;
    this.cachedUser$ = this._Http.get<IUser>(this.baseUrl + 'current-user', {
      withCredentials: true,
    }).pipe(
      tap(user => {
        if (user) {
          this.setAuthData(user);
          this.currentUserSubject.next(user);
        }
      }),
      catchError(() => {
        this.clearAuthStorage();
        this.currentUserSubject.next(null);
        return of(null);
      }),
      finalize(() => this.verificationInProgress = false),
      shareReplay(1)
    );
    return this.cachedUser$;
  }

  public confirmEmail(otp: string, email: string): Observable<IAuthResponse> {
    return this._Http.post<IAuthResponse>(this.baseUrl + 'confirm-email', { otp, email });
  }

  public register(formData: FormData): Observable<IAuthResponse> {
    return this._Http.post<IAuthResponse>(this.baseUrl + 'register', formData);
  }



  public loginWithGoogle(tokenId: string): Observable<IAuthResponse> {
    return this._Http.post<IAuthResponse>(this.baseUrl + 'google-login?TokenId=' + tokenId, {});
  }
  public registerWithGoogle(tokenId: string): Observable<IAuthResponse> {
    return this._Http.post<IAuthResponse>(this.baseUrl + 'register-google?TokenId=' + tokenId, {});
  }

  public login(loginData: any): Observable<IAuthResponse> {
    return this._Http.post<IAuthResponse>(
      this.baseUrl + 'login',
      loginData
     
    );
  }

  public logout(): void {
    this._Http.post(this.baseUrl + 'logout', {}, {
      withCredentials: true
    }).subscribe({
      next: () => this.handleLogout(),
      error: () => this.handleLogout()
    });
  }

  private handleLogout() {
    this.clearAuthStorage();
    this.currentUserSubject.next(null);
    this.cachedUser$ = null;
    this.router.navigate(['/login']);
  }
}
