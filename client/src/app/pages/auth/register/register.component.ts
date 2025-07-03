import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData = { email: '', password: '', confirmPassword: '' };
  error: string = '';
  success: string = '';

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly messageService: MessageService) {}

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.auth.register(this.registerData).subscribe({
      next: (responseData: {message: string}) => {
        this.success = `${responseData.message}! Please log in.`;
        this.error = '';
        this.router.navigate(['/auth/login']);
      },
      error: err => this.messageService.addMessage({
        content: `${err.error?.message}:${err.error?.error ?? 'Registration failed.'}`,
        type: 'error'
      })
    });
  }
}
