import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  error: string = '';

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly messageService: MessageService) {}

  login() {
    this.auth.login(this.loginData).subscribe({
      next: ({token, user}) => {
        this.auth.setAuthToken(token);
        this.auth.setUser(user);
        this.router.navigate(['/'])
      },
      error: err => this.messageService.addMessage({
        content: `${err.error?.message}:${err.error?.error ?? 'Login failed.'}`,
        type: 'error' 
      })
    });
  }
}
