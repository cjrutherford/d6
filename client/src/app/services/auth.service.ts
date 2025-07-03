import { Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserType } from './../../../../src/authentication/user.decorator';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = '/api/auth';
  constructor(private readonly http: HttpClient) {}
  token = signal<string | null>(localStorage.getItem('authToken') ?? null);
  user = signal<any>(null);
  isLoggedIn(): boolean {
    // Check the signal first, then fallback to localStorage
    return !!this.token() || !!localStorage.getItem('authToken');
  }

  getAuthToken(): string | null {
    // Return the signal value if set, otherwise check localStorage
    return this.token() ?? localStorage.getItem('authToken');
  }

  setAuthToken(token: string): void {
    this.token.set(token);
    localStorage.setItem('authToken', token);
  }

  clearAuthToken(): void {
    this.token.set(null);
    localStorage.removeItem('authToken');
  }

  setUser(user: any): void {
    this.user.set(user);
  }

  getUser(): any {
    return this.user();
  }

  get tokenPayload(): UserType | null {
    const token = this.getAuthToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  login(data: any): Observable<{ user: any, token: string }> {
    return this.http.post<{user: any, token: string}>(`${this.baseUrl}/login`, data);
  }
  register(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/register`, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
