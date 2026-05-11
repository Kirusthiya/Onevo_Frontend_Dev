import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest, MfaVerifyRequest, ForcePasswordChangeRequest, CurrentUser } from '../../../shared/interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/v1/auth`;

  // Signals for state management
  currentUser = signal<CurrentUser | null>(null);
  isAuthenticated = signal<boolean>(false);

  /**
   * Login with email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res.authenticated && res.user) {
            this.currentUser.set(res.user);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  /**
   * Refresh the access token using the httpOnly refresh cookie
   */
  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res.user) {
            this.currentUser.set(res.user);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  /**
   * Verify MFA code
   */
  verifyMfa(request: MfaVerifyRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/mfa/verify`, request, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res.user) {
            this.currentUser.set(res.user);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  /**
   * Logout and clear session
   */
  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
        })
      );
  }

  /**
   * Forgot password request
   */
  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/forgot-password`, { email });
  }
}
