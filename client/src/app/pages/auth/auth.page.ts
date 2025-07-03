import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss'
})
export class AuthPage {
  isLoggedIn = signal(!!localStorage.getItem('authToken'));
  mode: 'login' | 'register' | 'reset' = 'login';
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '', confirmPassword: '' };
  resetData = { oldPassword: '', newPassword: '', confirmNewPassword: '', email: '' };
  error: string = '';

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly messageService: MessageService) {}

  switchMode(mode: 'login' | 'register' | 'reset') {
    this.mode = mode;
    this.error = '';
  }

  login() {
    this.auth.login(this.loginData).subscribe({
      next: () => {
        this.isLoggedIn.set(true);
        this.messageService.addMessage({
          content: 'Login successful!',
          type: 'success'
        });
        this.router.navigate(['/']);
      },
      error: err => this.messageService.addMessage({
        content: `${err.error?.message}:${err.error?.error ?? 'Login failed.'}`,
        type: 'error'
      })
    });
  }

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.auth.register(this.registerData).subscribe({
      next: () => {
        this.messageService.addMessage({
          content: 'Registration successful! Please log in.',
          type: 'success'
        });
        this.switchMode('login');
      },
      error: err => {
        this.messageService.addMessage({
          content: `${err.error?.message}:${err.error?.error ?? 'Registration failed.'}`,
          type: 'error'
        });
      }
    });
  }

  reset() {
    this.auth.resetPassword(this.resetData).subscribe({
      next: () => {
        this.messageService.addMessage({
          content: 'Password reset successful! Please log in.',
          type: 'success'
        });
        this.switchMode('login')
      },
      error: err => {
        this.messageService.addMessage({
          content: err.error?.message ?? 'Password reset failed.',
          type: 'error'
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }
}
